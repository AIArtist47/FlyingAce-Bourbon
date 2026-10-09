"""Build the favicon set from the farm's own mark.

The mark is drawn light on nothing: #efefef over full transparency, which is
why it reads in the navy header and would read nowhere else. A tab strip is
white in most browsers' light theme, so shipped as it stands the favicon
would be a white plane on white. It goes on the brand navy instead, which is
what sits behind it everywhere else on the site and is the one treatment
that reads on a light tab strip and a dark one both.

Each size is drawn for itself rather than resampled from one master. A ring
and a pair of wings are thin lines, and at 16px a straight downscale turns
them to haze: the small sizes get a thicker stroke and less margin so the
plane is still a plane. The large ones do not need either.
"""
import io
import os
import sys
from PIL import Image, ImageEnhance, ImageFilter

SRC, OUT = sys.argv[1], sys.argv[2]

NAVY = (24, 33, 44, 255)  # --navy  #18212c
CREAM = (244, 238, 227)   # --cream #f4eee3

art = Image.open(SRC).convert('RGBA')
# Trim the artboard's transparent margin, so the roundel is sized by its own
# edge rather than by whatever space happened to be left around it.
art = art.crop(art.split()[3].getbbox())
alpha = art.split()[3]
print('artwork cropped to', art.size)


def render(px, pad_frac, dilate, sharpen):
    mask_src = alpha.filter(ImageFilter.MaxFilter(dilate)) if dilate else alpha
    side = max(art.size)
    pad = round(side * pad_frac)
    canvas = side + pad * 2

    mask = Image.new('L', (canvas, canvas), 0)
    mask.paste(mask_src, ((canvas - art.width) // 2, (canvas - art.height) // 2))

    tile = Image.new('RGBA', (canvas, canvas), NAVY)
    tile.paste(Image.new('RGBA', (canvas, canvas), CREAM + (255,)), (0, 0), mask)

    out = tile.resize((px, px), Image.LANCZOS)
    return ImageEnhance.Sharpness(out).enhance(1 + sharpen) if sharpen else out


#        px   pad    dilate sharpen
SPEC = {
    16:  (0.02, 5, 1.0),   # the standard-DPI tab: all the room it can get
    32:  (0.06, 3, 0.6),   # what most browsers actually show
    48:  (0.07, 0, 0.4),
    180: (0.10, 0, 0.0),   # iOS rounds the corners off this one
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
