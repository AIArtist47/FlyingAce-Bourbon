"""Build the favicon set from the farm's own mark.

The mark ships as supplied: #efefef over transparency, no tile behind it.
That is a deliberate choice and it has a consequence worth knowing — the
artwork is near-white, so on a browser's light tab strip there is almost
nothing to see. It reads on a dark tab strip, on a dark bookmarks bar, and
on iOS, which flattens a transparent touch icon onto black.

Putting it on the brand navy is the one change that would make it read
everywhere; `TILE` below is all that would take.

Each size is still drawn for itself rather than resampled from one master.
A ring and a pair of wings are thin lines, and at 16px a straight downscale
turns them to haze: the small sizes get a thicker stroke and less margin so
the plane is still a plane.
"""
import io
import os
import sys
from PIL import Image, ImageFilter

SRC, OUT = sys.argv[1], sys.argv[2]

# None ships the mark as supplied. A colour here puts it on a tile instead.
TILE = None  # e.g. (24, 33, 44, 255) for --navy #18212c

art = Image.open(SRC).convert('RGBA')
# Trim the artboard's transparent margin, so the roundel is sized by its own
# edge rather than by whatever space happened to be left around it.
art = art.crop(art.split()[3].getbbox())
ink = art.getpixel((art.width // 2, 0))  # whatever colour the mark is drawn in
alpha = art.split()[3]
print(f'artwork {art.size}, ink {ink[:3]}, tile {TILE or "none (transparent)"}')


def render(px, pad_frac, dilate):
    mask = alpha.filter(ImageFilter.MaxFilter(dilate)) if dilate else alpha
    side = max(art.size)
    pad = round(side * pad_frac)
    canvas = side + pad * 2

    placed = Image.new('L', (canvas, canvas), 0)
    placed.paste(mask, ((canvas - art.width) // 2, (canvas - art.height) // 2))

    base = Image.new('RGBA', (canvas, canvas), TILE or (0, 0, 0, 0))
    base.paste(Image.new('RGBA', (canvas, canvas), ink[:3] + (255,)), (0, 0), placed)
    return base.resize((px, px), Image.LANCZOS)


#       px:  pad    dilate
SPEC = {
    16:  (0.02, 5),   # the standard-DPI tab: all the room it can get
    32:  (0.04, 3),   # what most browsers actually show
    48:  (0.05, 0),
    180: (0.08, 0),   # iOS rounds the corners off this one
}

frames = {px: render(px, *SPEC[px]) for px in SPEC}

frames[180].save(f'{OUT}/apple-touch-icon.png')
frames[32].save(f'{OUT}/favicon-32x32.png')
frames[16].save(f'{OUT}/favicon-16x16.png')


# One .ico carrying all three small sizes, each drawn for itself.
#
# Written out by hand because Pillow's ICO writer takes a single image and
# resamples the rest from it, which would undo every bit of the tuning above
# -- asked for three sizes it produced one frame and ignored the others. The
# container is a 6-byte header, a 16-byte entry per frame, then the frames,
# and PNG-compressed frames inside an .ico have been read by everything since
# Vista.
def write_ico(path, images):
    import struct
    blobs = []
    for im in images:
        buf = io.BytesIO()
        im.save(buf, format='PNG', optimize=True)
        blobs.append(buf.getvalue())

    offset = 6 + 16 * len(blobs)
    out = [struct.pack('<HHH', 0, 1, len(blobs))]
    for im, blob in zip(images, blobs):
        out.append(struct.pack(
            '<BBBBHHII',
            im.width if im.width < 256 else 0,
            im.height if im.height < 256 else 0,
            0, 0, 1, 32, len(blob), offset,
        ))
        offset += len(blob)
    out.extend(blobs)

    with open(path, 'wb') as fh:
        fh.write(b''.join(out))


write_ico(f'{OUT}/favicon.ico', [frames[16], frames[32], frames[48]])

for name in ('favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png',
             'apple-touch-icon.png'):
    print(f'  {name:22} {os.path.getsize(os.path.join(OUT, name)):>7} bytes')
