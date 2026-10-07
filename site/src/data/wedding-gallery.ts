/**
 * The wedding gallery: every photograph the farm publishes on
 * flyingacefarm.com/weddings/ — all 77 of them, from three weddings,
 * re-encoded to what this page renders.
 *
 * Dealt round-robin across four rows from a list already interleaved by shoot,
 * so no row is one wedding end to end.
 *
 * `w` and `h` are the thumbnail's own pixels. They are here so the component
 * can work out how far each row has to travel and give every row the same
 * speed: the rows hold different numbers of frames at different widths, and a
 * shared duration would have them drifting at visibly different rates.
 */

export type GalleryFrame = { id: string; w: number; h: number };

export const galleryRows: GalleryFrame[][] = [
  // row 1: 20 frames
  [
    { id: 'g01', w: 498, h: 360 },
    { id: 'g05', w: 541, h: 360 },
    { id: 'g09', w: 540, h: 360 },
    { id: 'g13', w: 240, h: 360 },
    { id: 'g17', w: 541, h: 360 },
    { id: 'g21', w: 540, h: 360 },
    { id: 'g25', w: 540, h: 360 },
    { id: 'g29', w: 541, h: 360 },
    { id: 'g33', w: 540, h: 360 },
    { id: 'g37', w: 540, h: 360 },
    { id: 'g41', w: 540, h: 360 },
    { id: 'g45', w: 540, h: 360 },
    { id: 'g49', w: 541, h: 360 },
    { id: 'g53', w: 541, h: 360 },
    { id: 'g57', w: 541, h: 360 },
    { id: 'g61', w: 540, h: 360 },
    { id: 'g65', w: 240, h: 360 },
    { id: 'g69', w: 540, h: 360 },
    { id: 'g73', w: 540, h: 360 },
    { id: 'g77', w: 240, h: 360 },
  ],

  // row 2: 19 frames
  [
    { id: 'g02', w: 541, h: 360 },
    { id: 'g06', w: 540, h: 360 },
    { id: 'g10', w: 240, h: 360 },
    { id: 'g14', w: 541, h: 360 },
    { id: 'g18', w: 540, h: 360 },
    { id: 'g22', w: 540, h: 360 },
    { id: 'g26', w: 540, h: 360 },
    { id: 'g30', w: 240, h: 360 },
    { id: 'g34', w: 240, h: 360 },
    { id: 'g38', w: 541, h: 360 },
    { id: 'g42', w: 540, h: 360 },
    { id: 'g46', w: 240, h: 360 },
    { id: 'g50', w: 540, h: 360 },
    { id: 'g54', w: 240, h: 360 },
    { id: 'g58', w: 240, h: 360 },
    { id: 'g62', w: 240, h: 360 },
    { id: 'g66', w: 240, h: 360 },
    { id: 'g70', w: 240, h: 360 },
    { id: 'g74', w: 240, h: 360 },
  ],

  // row 3: 19 frames
  [
    { id: 'g03', w: 540, h: 360 },
    { id: 'g07', w: 240, h: 360 },
    { id: 'g11', w: 541, h: 360 },
    { id: 'g15', w: 540, h: 360 },
    { id: 'g19', w: 540, h: 360 },
    { id: 'g23', w: 500, h: 360 },
    { id: 'g27', w: 540, h: 360 },
    { id: 'g31', w: 540, h: 360 },
    { id: 'g35', w: 541, h: 360 },
    { id: 'g39', w: 540, h: 360 },
    { id: 'g43', w: 240, h: 360 },
    { id: 'g47', w: 239, h: 360 },
    { id: 'g51', w: 541, h: 360 },
    { id: 'g55', w: 541, h: 360 },
    { id: 'g59', w: 240, h: 360 },
    { id: 'g63', w: 540, h: 360 },
    { id: 'g67', w: 240, h: 360 },
    { id: 'g71', w: 240, h: 360 },
    { id: 'g75', w: 540, h: 360 },
  ],

  // row 4: 19 frames
  [
    { id: 'g04', w: 540, h: 360 },
    { id: 'g08', w: 239, h: 360 },
    { id: 'g12', w: 540, h: 360 },
    { id: 'g16', w: 240, h: 360 },
    { id: 'g20', w: 541, h: 360 },
    { id: 'g24', w: 240, h: 360 },
    { id: 'g28', w: 240, h: 360 },
    { id: 'g32', w: 541, h: 360 },
    { id: 'g36', w: 540, h: 360 },
    { id: 'g40', w: 540, h: 360 },
    { id: 'g44', w: 541, h: 360 },
    { id: 'g48', w: 240, h: 360 },
    { id: 'g52', w: 240, h: 360 },
    { id: 'g56', w: 240, h: 360 },
    { id: 'g60', w: 240, h: 360 },
    { id: 'g64', w: 540, h: 360 },
    { id: 'g68', w: 240, h: 360 },
    { id: 'g72', w: 540, h: 360 },
    { id: 'g76', w: 240, h: 360 },
  ],
];

export const galleryCount = 77;
