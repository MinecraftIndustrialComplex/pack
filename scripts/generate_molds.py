import json
import zipfile
import os
from io import BytesIO
from PIL import Image

def main():
    config_path = "molds_config.json"
    with open(config_path, "r") as f:
        config = json.load(f)

    blank_mold_jar = config["blank_mold_jar"]
    blank_mold_path = config["blank_mold_path"]
    tool_heads_jar = config["tool_heads_jar"]
    output_dir = config["output_dir"]
    molds = config["molds"]

    os.makedirs(output_dir, exist_ok=True)

    # Extract blank mold
    with zipfile.ZipFile(blank_mold_jar, 'r') as cm_zip:
        with cm_zip.open(blank_mold_path) as f:
            blank_mold_img = Image.open(f).convert("RGBA")

    # Extract tool heads and process
    with zipfile.ZipFile(tool_heads_jar, 'r') as og_zip:
        for mold_name, tool_head_path in molds.items():
            with og_zip.open(tool_head_path) as f:
                tool_head_img = Image.open(f).convert("RGBA")

            # Ensure same size
            if blank_mold_img.size != tool_head_img.size:
                print(f"Size mismatch for {mold_name}. Skipping.")
                continue

            # Create a copy of the blank mold to modify
            result_img = blank_mold_img.copy()
            result_pixels = result_img.load()
            tool_pixels = tool_head_img.load()

            width, height = result_img.size
            for x in range(width):
                for y in range(height):
                    # If tool head pixel is not fully transparent
                    r, g, b, a = tool_pixels[x, y]
                    if a > 0:
                        # Make the corresponding pixel in the mold transparent
                        result_pixels[x, y] = (0, 0, 0, 0)

            output_path = os.path.join(output_dir, f"graphite_{mold_name}_mold.png")
            result_img.save(output_path)
            print(f"Generated {output_path}")

if __name__ == "__main__":
    main()
