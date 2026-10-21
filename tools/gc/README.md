# pack-gc: Rust build garbage collection for the MIC pack

Every repo under `../mods/` builds with cargo, and every agent worktree gets its own `target/`.
Left alone they grew to about 270 GB on 2026-10-21 (Ben: "get a decent garbage collection system
up and running for you two and future agents in this pack"). `pack-gc.py` keeps them in check.

    python3 tools/gc/pack-gc.py report        # sizes and verdicts, deletes nothing
    python3 tools/gc/pack-gc.py --dry-run     # what a pass would delete
    python3 tools/gc/pack-gc.py               # one pass
    python3 tools/gc/pack-gc.py subvol TREE   # make TREE/target a btrfs subvolume now (contents kept)
    python3 tools/gc/pack-gc.py install       # daily user timer (04:30, or at the next boot if the laptop was off)

`install` writes plain unit files to `~/.config/systemd/user/`. This laptop runs NixOS with Home
Manager, so the durable home for the timer is Ben's Nix config (`systemd.user.services.pack-gc`
and `systemd.user.timers.pack-gc`, the same settings as the script's UNIT and TIMER); the plain
files are a stopgap until it moves there.

The rules are in the script's header. In short: a tree in use (a process inside it, a held cargo
lock) or built in the last 6 h is never touched; a repo's main checkout only ever loses
`incremental/` (the GameTests load natives from it); a merged, clean tree loses its `target/`; an
open one loses `incremental/` after 2 idle days and `target/` after 7; above a 100 GiB budget the
least recently active targets idle at least 24 h go; a spent agent worktree (`.claude/worktrees/agent-*`,
merged, clean, idle 3 days) is removed, its ignored notes kept under
`~/.local/state/pack-gc/archive/`. Only cargo targets (with cargo's `CACHEDIR.TAG`) and spent
agent worktrees are ever deleted. Log: `~/.local/state/pack-gc/log`.

**Snapshots.** `/home` is btrfs with hourly snapper snapshots kept up to two weeks, so deleting
a plain `target/` frees nothing until the last snapshot holding it expires, and every rebuild's
rewritten files stay pinned the same way. Snapshots stop at nested subvolumes, so a target this
tool deletes comes back as an empty subvolume: the next build lands outside the snapshots and its
deletion frees space at once. `subvol TREE` converts a live target now by a reflink copy (it
refuses while a process or build is inside the tree). The report marks each target `subvol` or
`snapshotted` and splits what a pass frees the same way; `df` is the truth.

For agents in any pack repo:
- Call `python3 /home/greencheetah/Projects/mic/pack/tools/gc/pack-gc.py` after merging a branch
  (it takes a lock and skips trees in use, so it is safe to run while other sessions build).
- Most of a target's size is incremental caches and full debug info. `debug = "line-tables-only"`
  is safe everywhere. Incremental is per repo: mic-rtsim keeps it on, because its agents edit and
  compile many times in one tree, and the GC trims it from trees idle 2 days; Deep Time's VM
  builds turn it off.
- Do not keep a shell parked in a worktree you are done with: a process inside a tree (its cwd,
  an open file or a mapped library such as a GameTest JVM's native) keeps it.
- Do not symlink `target/` to a shared folder: the GC skips symlinked targets, so nothing would
  collect it.
- A new worktree: create its target as a subvolume before the first build
  (`btrfs subvolume create <tree>/target`, no root needed), or run `pack-gc.py subvol <tree>`.

Deep Time builds on its Azure VM; its VM copies have their own collector,
`mods/deep-time/tools/remote/mac-gc.sh`.
