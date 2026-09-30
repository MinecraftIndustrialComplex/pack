#!/usr/bin/env python3
"""Generate config/projectatmosphere/biome_temps.json: Project Atmosphere temperatures for Terralith.

    python3 scripts/gen_pa_biome_temps.py --terralith Terralith_1.21.1_v2.6.2_Neoforge.jar \
        [--out config/projectatmosphere/biome_temps.json] [--table]

Standard library only. The only input is the Terralith jar (2.6.2); nothing of Project Atmosphere (PA) is
read or redistributed: the PA numbers used below (ANCHORS, WATER) are PA 0.9.1.2's own built-in rows for
vanilla biomes, copied as plain data.

WHY THIS FILE EXISTS
  PA keeps a per-biome temperature table (BiomeTempConfig) that knows vanilla and a dozen other biome mods
  but no Terralith biome. For an unknown biome PA uses Range(0, 0): the daily clamp collapses to 0, so the
  biome "expected temperature" is 0 C and the region forecast is about +-2 C. Terralith is the MIC pack's
  only biome mod (130 biome JSONs: 95 terralith:*, 35 minecraft:* overrides), so Terralith land sat near 0 C
  all year: PA's own snow, clouds and weather followed, and so does everything in the pack that reads PA
  (mic-climate, and through it Destroy, Power Grid, LSO).

HOW PA READS THE FILE (0.9.1.2, BiomeTempUserConfig)
  config/projectatmosphere/biome_temps.json, read once at common setup (server and client). Only the
  "biomes" object is read; other root keys are ignored (PA's own template has a "_note"). Each entry is
  "<namespace:path>" -> either {"all": {"min", "max"}} or all four of winter/spring/summer/autumn, each
  {"min", "max"} in degrees Celsius. An entry replaces any built-in row for that id. Absent file: PA writes
  its two-entry template. Absent biome: Range(0, 0), see above. PA turns a Range into its daily clamp:
      minMin = min - 0.1*span, avgNight = min + 0.25*span, avgDay = min + 0.75*span, maxMax = max + 0.1*span
  so `min` is the cold night and `max` the warm day of that season, and the season's mean is about (min+max)/2.
  (PA also feeds the biome's vanilla `temperature` through -0.5..2.0 -> [min, max] as a starting point and then
  eases it toward that clamp. The brief's "-0.5..2.0 -> -20..+56 C" mapping does not exist in 0.9.1.2.)

THE RULE (per terralith:* biome; everything below is reproduced by this script)
  Inputs per biome: t = `temperature` and d = `downfall` from its biome JSON (t clamped to -0.5..2.0, d to
  0..1; Terralith uses d = -0.5 on "clearing" biomes as a colour trick), and Tp = the placement temperature
  parameter from Terralith's multi_noise_biome_source_parameter_list (-1..1; the area-weighted mean of the
  biome's parameter cells).
  1. Annual mean MAT. Two monotone piecewise-linear curves whose nodes are the annual means PA's own table gives
     the vanilla biomes at that t or Tp (NODES_P, NODES_T), blended MAT = 0.6*curve_Tp(Tp) + 0.4*curve_t(t) and
     limited to PA's own extremes (-18.1 C ice_spikes .. +26.1 C jungle). On PA's 14 anchor biomes this
     reproduces the annual mean to 4.1 C RMS; the brief's literal mapping (-20 + (t+0.5)*30.4) is off by 14.4 C
     RMS on the same rows (it puts every t = 2.0 biome at 56 C; PA's desert averages 25 C).
  2. Seasons and day/night span. PA's vanilla rows are hand-tuned, so the shape of each season (offset from MAT,
     and max - min) is a Gaussian kernel blend of the anchor rows, weighted by closeness in (MAT, d, t)
     (sigma 3.5 C, 0.25, 0.5). min/max = MAT + offset -+ span/2, rounded to 0.5 C. The result stays inside PA's
     own design space: a Terralith desert gets PA's desert rows, a rainforest PA's jungle rows, a wintry biome
     PA's snowy rows.
  3. Underground (terralith:cave/*): no seasons, `all` range, hand-set like PA's own cave rows
     (dripstone_caves 8..15, lush_caves 12..20, deep_dark 5..12): stone caves 8..14, fungal 13..19,
     deep 12..18, underground jungle 21..28, thermal 26..36, mantle 38..48 (PA nether_wastes 45..50),
     frostfire -2..6. Their biome JSON temperature and placement say nothing useful about the ground.
  4. Water and shore (deep_warm_ocean, warm_river, gravel_beach): PA's ocean / river / beach row, shifted by 0.4 of
     the MAT difference against that vanilla biome (PA itself maps warm_ocean to its ocean row unshifted).
  Altitude is not modelled: PA applies its own lapse rate at the real height.

EXISTING WORLDS KEEP THEIR OLD FORECASTS (verified on a headless MIC server, 2026-09-30)
  PA saves each region's forecast (world/overworld/data/projectatmosphere/region_forecasts plus
  world/data/project_atmosphere_live_atmosphere.dat) and reloads it at start. It regenerates a saved region only
  if it fails PA's corruption check, never on a season or day change (those shift a drift offset, or rebuild
  only when no region is saved at all). So a world that already generated regions before this table keeps
  Terralith near 0 C in those regions: booting the old world with this file changed its readings by 0.1 C.
  Regions generated afterwards, and every region of a new world, use the table. To apply it to an old world,
  stop the server and delete those two paths (regions regenerate lazily, the same boot then matched a fresh
  world to 0.2 C), or run `/pa forecast regenerate` with players online (PA rebuilds around them; not tested).
  Check a biome from the console, standing in it: `/pa temperature raw` prints PA's week for the biome under
  the source position, straight from the table (about +-2 C all week without an entry). `/pa temperature
  current` and mic_climate's probe give PA's regional value instead, a blend over a 2000-block region.
"""
import argparse
import collections
import json
import math
import sys
import zipfile

SEASONS = ["winter", "spring", "summer", "autumn"]

# PA 0.9.1.2 built-in rows (winter, spring, summer, autumn) as (min, max) degC, and the vanilla 1.21.1
# temperature / downfall of each anchor (savanna: Terralith overrides 2.0 to 1.2). birch_forest and the
# windswept/peaks rows are mirrors of other rows in PA and are not anchors.
ANCHORS = {
    #                 t     d    winter          spring          summer          autumn
    "snowy_plains":    (0.0,  0.5, [(-35, -10), (-15, 5),   (5, 15),   (-15, 5)]),
    "ice_spikes":      (0.0,  0.5, [(-50, -30), (-30, -5),  (-5, 5),   (-30, 0)]),
    "taiga":           (0.25, 0.8, [(-25, -5),  (-5, 10),   (10, 22),  (-5, 10)]),
    "cherry_grove":    (0.5,  0.8, [(-12, 2),   (-1, 14),   (8, 28),   (4, 21)]),
    "meadow":          (0.5,  0.8, [(-12, 3),   (2, 14),    (15, 26),  (2, 14)]),
    "forest":          (0.7,  0.8, [(-18, 5),   (-7, 13),   (7, 28),   (-2, 19)]),
    "dark_forest":     (0.7,  0.8, [(-22, 3),   (-12, 11),  (8, 24),   (-9, 14)]),
    "plains":          (0.8,  0.4, [(-20, 5),   (-10, 18),  (15, 36),  (-6, 18)]),
    "swamp":           (0.8,  0.9, [(-5, 10),   (10, 22),   (20, 35),  (10, 22)]),
    "savanna":         (1.2,  0.0, [(10, 25),   (15, 30),   (20, 40),  (15, 30)]),
    "desert":          (2.0,  0.0, [(5, 20),    (15, 35),   (30, 45),  (15, 35)]),
    "badlands":        (2.0,  0.0, [(0, 20),    (10, 30),   (25, 40),  (10, 30)]),
    "jungle":          (0.95, 0.9, [(20, 25),   (22, 30),   (25, 35),  (22, 30)]),
    "mushroom_fields": (0.9,  1.0, [(5, 15),    (10, 20),   (15, 25),  (10, 20)]),
}
# Water / shore analogs: (t, row)
WATER = {
    "ocean": (0.5, [(0, 10), (5, 15), (10, 20), (5, 15)]),
    "river": (0.5, [(-5, 5), (5, 18), (18, 30), (5, 18)]),
    "beach": (0.8, [(-2, 8), (2, 14), (15, 30), (5, 18)]),
}
WATER_OF = {
    "terralith:deep_warm_ocean": "ocean",
    "terralith:warm_river": "river",
    "terralith:gravel_beach": "beach",
}
# Underground biomes (see rule 3).
CAVES = {
    "terralith:cave/andesite_caves": (8, 14), "terralith:cave/diorite_caves": (8, 14),
    "terralith:cave/granite_caves": (9, 15), "terralith:cave/tuff_caves": (8, 14),
    "terralith:cave/infested_caves": (9, 14), "terralith:cave/fungal_caves": (13, 19),
    "terralith:cave/deep_caves": (12, 18), "terralith:cave/frostfire_caves": (-2, 6),
    "terralith:cave/underground_jungle": (21, 28), "terralith:cave/thermal_caves": (26, 36),
    "terralith:cave/mantle_caves": (38, 48),
}

# Annual-mean curves: (feature, degC). Read off the anchors' annual means (mean of the four seasonal midpoints):
#   Tp: frozen -0.68 -> -12 (snowy_plains -5.6, ice_spikes -18.1), cold -0.22 -> 1.5 (taiga), temperate 0.04 -> 6
#       (forest, plains), warm 0.38 -> 24 (jungle 26.1, savanna 23.1), hot 0.78 -> 24 (desert 25, badlands 20.6)
#   t:  0.0 -> -12 (snowy_plains, ice_spikes), 0.25 -> 1.5 (taiga), 0.5 -> 8 (cherry_grove, meadow), 0.8 -> 9.5
#       (plains, forest, swamp, beach), 0.95 -> 24 (jungle), 1.2 -> 23 (savanna), 2.0 -> 24 (desert, badlands)
# The cold ends (Tp -1, t -0.5) are extrapolated to -18, PA's own coldest annual mean.
NODES_P = [(-1.0, -18.0), (-0.68, -12.0), (-0.22, 1.5), (0.04, 6.0), (0.2, 14.0), (0.38, 24.0), (0.78, 24.0), (1.0, 24.0)]
NODES_T = [(-0.5, -18.0), (0.0, -12.0), (0.25, 1.5), (0.5, 8.0), (0.8, 9.5), (0.95, 24.0), (1.2, 23.0), (2.0, 24.0)]
MAT_LO, MAT_HI = -18.1, 26.1
W_P = 0.6
SIG_M, SIG_D, SIG_T = 3.5, 0.25, 0.5
WATER_SHIFT = 0.4


def clamp(x, a, b):
    return max(a, min(b, x))


def interp(nodes, x):
    if x <= nodes[0][0]:
        return nodes[0][1]
    if x >= nodes[-1][0]:
        return nodes[-1][1]
    for (x0, y0), (x1, y1) in zip(nodes, nodes[1:]):
        if x0 <= x <= x1:
            return y0 if x1 == x0 else y0 + (y1 - y0) * (x - x0) / (x1 - x0)


def mat(t, tp):
    return clamp(W_P * interp(NODES_P, clamp(tp, -1.0, 1.0)) + (1 - W_P) * interp(NODES_T, clamp(t, -0.5, 2.0)),
                 MAT_LO, MAT_HI)


def rng(v):
    return (v[0], v[1]) if isinstance(v, list) else (v, v)


def load_placements(jar):
    """biome id -> {'Tp': area-weighted mean temperature parameter} from Terralith's multi_noise list."""
    name = "data/minecraft/worldgen/multi_noise_biome_source_parameter_list/overworld.json"
    plist = json.loads(jar.read(name))
    cells = collections.defaultdict(list)
    for e in plist["lithostitched:biomes"]:
        p = e["parameters"]
        cells[e["biome"]].append({k: rng(p[k]) for k in ("temperature", "humidity", "continentalness", "erosion")})
    out = {}
    for b, es in cells.items():
        ws = [max(1e-6, (e["temperature"][1] - e["temperature"][0]) * (e["humidity"][1] - e["humidity"][0]) *
                  (e["continentalness"][1] - e["continentalness"][0]) * (e["erosion"][1] - e["erosion"][0]))
              for e in es]
        tot = sum(ws)
        out[b] = {"Tp": sum((e["temperature"][0] + e["temperature"][1]) / 2 * w for e, w in zip(es, ws)) / tot}
    return out


def anchor_rows(placements, terralith_minecraft):
    rows = {}
    for name, (t, d, rs) in ANCHORS.items():
        over = terralith_minecraft.get(name)
        if over is not None and (abs(over[0] - t) > 1e-6 or abs(over[1] - d) > 1e-6):
            sys.exit(f"gen_pa_biome_temps: {name}: Terralith overrides t/d to {over}, update ANCHORS ({t}, {d})")
        mids = [(lo + hi) / 2 for lo, hi in rs]
        m = sum(mids) / 4
        rows[name] = dict(t=clamp(t, -0.5, 2.0), d=clamp(d, 0, 1), mat=m,
                          off=[x - m for x in mids], span=[hi - lo for lo, hi in rs],
                          Tp=placements["minecraft:" + name]["Tp"])
    return rows


def ranges_for(rows, m, d, t):
    ws = {n: math.exp(-0.5 * (((m - r["mat"]) / SIG_M) ** 2 + ((d - r["d"]) / SIG_D) ** 2 + ((t - r["t"]) / SIG_T) ** 2))
          for n, r in rows.items()}
    tot = sum(ws.values()) or 1.0
    off = [sum(ws[n] * rows[n]["off"][i] for n in ws) / tot for i in range(4)]
    span = [sum(ws[n] * rows[n]["span"][i] for n in ws) / tot for i in range(4)]
    return [(m + o - s / 2, m + o + s / 2) for o, s in zip(off, span)]


def r5(x):
    return round(x * 2) / 2


def build(terralith_jar):
    jar = zipfile.ZipFile(terralith_jar)
    placements = load_placements(jar)
    tm = {}
    for n in jar.namelist():
        if n.startswith("data/minecraft/worldgen/biome/") and n.endswith(".json"):
            j = json.loads(jar.read(n))
            tm[n.rsplit("/", 1)[1][:-5]] = (j["temperature"], j["downfall"])
    rows = anchor_rows(placements, tm)
    biomes = {}
    for n in sorted(jar.namelist()):
        if not (n.startswith("data/terralith/worldgen/biome/") and n.endswith(".json")):
            continue
        bid = "terralith:" + n[len("data/terralith/worldgen/biome/"):-5]
        j = json.loads(jar.read(n))
        if bid in CAVES:
            lo, hi = CAVES[bid]
            biomes[bid] = dict(kind="cave", t=j["temperature"], d=j["downfall"], Tp=None, mat=None,
                               rng=[(float(lo), float(hi))] * 4, all=True)
            continue
        t, d = clamp(j["temperature"], -0.5, 2.0), clamp(j["downfall"], 0, 1)
        tp = placements[bid]["Tp"]
        m = mat(t, tp)
        if bid in WATER_OF:
            at, rs = WATER[WATER_OF[bid]]
            a_tp = placements["minecraft:" + WATER_OF[bid]]["Tp"] if "minecraft:" + WATER_OF[bid] in placements else 0.0
            shift = WATER_SHIFT * (m - mat(at, a_tp))
            rg = [(lo + shift, hi + shift) for lo, hi in rs]
            kind = "water"
        else:
            rg = ranges_for(rows, m, d, t)
            kind = "land"
        rg = [(r5(lo), r5(hi)) for lo, hi in rg]
        rg = [(lo, max(hi, lo + 3.0)) for lo, hi in rg]
        biomes[bid] = dict(kind=kind, t=t, d=d, Tp=tp, mat=sum((lo + hi) / 2 for lo, hi in rg) / 4, rng=rg, all=False)
    missing = sorted(set(CAVES) - set(biomes))
    if missing:
        sys.exit(f"gen_pa_biome_temps: cave ids not in the jar: {missing}")
    return biomes


def fmt(v):
    return f"{v:.1f}"


def write_json(biomes, path, jar_name):
    lines = ["{",
             '  "_note": "Project Atmosphere biome temperatures in Celsius. Only the \'biomes\' object is read; keys starting with _ are ignored.",',
             f'  "_what": "Terralith biomes for the MIC pack ({jar_name}). Without an entry PA treats a biome as 0 C all year. Generated by scripts/gen_pa_biome_temps.py, edit that, not this.",',
             '  "_fields": "Each season is {min, max} = cold night and warm day of that season; PA derives its daily curve from it (minMin = min-0.1*span, avgNight = min+0.25*span, avgDay = min+0.75*span, maxMax = max+0.1*span).",',
             '  "_rule": "MAT = 0.6*curve(placement temperature parameter) + 0.4*curve(biome JSON temperature), curves read off PA\'s own vanilla rows and limited to -18.1..26.1 C. Season offsets and spans = kernel blend of PA\'s vanilla rows near (MAT, downfall, temperature). Caves: hand-set flat ranges. Water: PA ocean/river/beach row shifted by 0.4 of the MAT difference. Full rule in the script header.",',
             '  "biomes": {']
    items = list(biomes.items())
    for i, (bid, b) in enumerate(items):
        if b["all"]:
            lo, hi = b["rng"][0]
            body = f'{{"all": {{"min": {fmt(lo)}, "max": {fmt(hi)}}}}}'
        else:
            body = "{" + ", ".join(f'"{s}": {{"min": {fmt(lo)}, "max": {fmt(hi)}}}' for s, (lo, hi) in zip(SEASONS, b["rng"])) + "}"
        lines.append(f'    "{bid}": {body}' + ("," if i + 1 < len(items) else ""))
    lines += ["  }", "}", ""]
    text = "\n".join(lines)
    json.loads(text)  # must be valid JSON
    with open(path, "w") as f:
        f.write(text)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--terralith", required=True)
    ap.add_argument("--out", default="config/projectatmosphere/biome_temps.json")
    ap.add_argument("--table", action="store_true", help="print the derived table")
    a = ap.parse_args()
    biomes = build(a.terralith)
    write_json(biomes, a.out, a.terralith.rsplit("/", 1)[-1])
    if a.table:
        for bid, b in biomes.items():
            f = "" if b["Tp"] is None else f"t={b['t']:5.2f} d={b['d']:4.2f} Tp={b['Tp']:5.2f} MAT={b['mat']:5.1f}"
            print(f"{bid:38s} {b['kind']:5s} {f:40s} " + " ".join(f"[{lo:g},{hi:g}]" for lo, hi in b["rng"]))
    print(f"wrote {len(biomes)} biomes to {a.out}")


if __name__ == "__main__":
    main()
