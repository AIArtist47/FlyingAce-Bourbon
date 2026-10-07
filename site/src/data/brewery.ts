/**
 * Brewery page content.
 *
 * Transcribed from the Brewery — Desktop artboard (project/Brewery.dc.html).
 * Imagery comes from flyingacefarm.com/brewery/ and lives in
 * public/images/brewery/.
 *
 * NOTE: a tap list is perishable. The artboard's draft list and the live site
 * had already drifted apart when this was built (the site was showing Märzen,
 * Berry Blood Orange Sour and Pumpkin Pie Ale; the artboard lists Red Tail,
 * Sombeero and the sours below). The artboard is the source of truth here, as
 * specified — but this file is the one to hand to whoever updates the taps,
 * or to replace with a CMS feed.
 */

const B = '/images/brewery';

export const breweryHero = {
  eyebrow: 'Flying Ace Farm Brewery',
  title: 'Raise a glass',
  lede: '15+ rotating beers and seltzers on tap — including a cream ale brewed with nearly 300 pounds of our own Bloody Butcher corn.',
  image: `${B}/hero-tanks.jpg`,
  alt: 'Fermentation tanks in the Flying Ace Farm brewery',
};

export const veteransProgram = {
  eyebrow: 'Honoring all who served',
  title: 'Buy a Veteran a Beer',
  body: 'Our pay-it-forward program lets any guest buy a beer for a veteran. When a veteran comes in, their first beer has already been bought by someone in our community.',
  image: `${B}/veterans.jpg`,
  alt: '“Buy a veteran a beer” sign in the Flying Ace Farm taproom',
};

/** The five year-round beers. Awards only hang off the Cream Ale. */
export const flagships = [
  {
    name: '“Bloody Butcher” Cream Ale',
    spec: 'Cream Ale · 5.0% ABV · 18 IBU',
    body: 'Farm-to-glass: nearly 300 pounds of our heirloom Bloody Butcher corn in every batch. Smooth, faintly sweet and unmistakably ours.',
    awards: [
      'Best of Loudoun Beer 2025',
      'Silver · 2025 Brewers’ Choice',
      'Bronze · 2024 VA Craft Beer Cup',
    ],
  },
  {
    name: '“Pilots” Pilsner',
    spec: 'German Pilsner · 5.2% ABV · 12 IBU',
    body: 'Pilsner malt and lager yeast fermented warm, balanced with Hallertau and Tettnang hops. The easy-drinking go-to.',
    awards: [],
  },
  {
    name: '“Guns A Go-Go” West Coast IPA',
    spec: 'West Coast IPA · 5.4% ABV · 50 IBU',
    body: 'Chinook, Centennial and Simcoe for dank citrus, fermented with yeast from Jasper Yeast Labs in Dulles, VA.',
    awards: [],
  },
  {
    name: '“Military Hop” New England IPA',
    spec: 'NEIPA · 6.0% ABV · 25.5 IBU',
    body: 'Amarillo, Mosaic, Lotus and Trident, then dry hopped with Mosaic, Lotus and Simcoe. Unfiltered and tropical.',
    awards: [],
  },
  {
    name: '“Wilco Wit” Witbier',
    spec: 'Wheat Ale · 5.4% ABV · 18 IBU',
    body: 'Sweet orange peel, coriander and grains of paradise on a Winter White Wheat base. An all-season drinker.',
    awards: [],
  },
];

/** Rotating taps — beers, seltzers, cider and a non-alcoholic option. */
export const seasonal = [
  { name: '“Red Tail” Irish Red Ale', body: 'Caramel, vanilla and a touch of roast.', spec: '4.5% · 20 IBU' },
  { name: 'Ultra Light Lager', body: 'Pilsner malt and flaked rice; clean and crisp.', spec: '5.5% · 10 IBU' },
  { name: '“Sombeero” Mexican Amber Lager', body: 'Silver · 2025 Virginia Craft Beer Cup.', spec: '6.4% · 18 IBU' },
  { name: '“Flying Session” Pale Ale', body: 'Mosaic and Cascade; apricot and cream.', spec: '4.4% · 50 IBU' },
  { name: '“Mayday” DDH New England IPA', body: 'Lotus and Krush; orange creamsicle, passion fruit.', spec: '8.2% · 44 IBU' },
  { name: '“Stormchaser” Irish Stout', body: 'Roasted coffee and dark chocolate; dry finish.', spec: '4.6% · 50 IBU' },
  { name: 'Blueberry Peach Cobbler Sour', body: 'Ripe blueberry and peach with a tart twist.', spec: '5.9% · 10 IBU' },
  { name: '“Cherry Bomb” Sour Ale', body: 'Bright cherry, tangy then lightly sweet.', spec: '5.2% · 10 IBU' },
  { name: 'Blue Raspberry Seltzer', body: 'Sweet-tart berry, clean and bubbly.', spec: '5.0%' },
  { name: '“Peach Blossom” Seltzer', body: 'Sun-ripened peach and honeysuckle.', spec: '5.0%' },
  { name: '“Ladies Man” Cider', body: 'Apple-raspberry, subtly sweet.', spec: '7.0% · Fabbioli Cellars' },
  { name: 'Athletic Brewing “Free Wave” / “Run Wild”', body: 'Hazy IPA and sessionable IPA.', spec: 'Non-alcoholic · <0.5%' },
];

export const beerToGo = [
  {
    title: '6-Packs',
    price: '$14.99 / 6-pack',
    body: 'Our flagship beers in 6-packs, available to go only.',
    image: `${B}/sixpacks.jpg`,
    alt: 'Bloody Butcher Cream Ale cans',
  },
  {
    title: 'Crowlers',
    price: 'Starting at $9.99',
    body: '16 oz crowlers of any beer on tap, available to go only.',
    image: `${B}/crowlers.jpg`,
    alt: 'Flying Ace Farm tap handles and crowler cans',
  },
];

export const gallery = [
  { src: `${B}/strip/g1-taps.webp`, full: `${B}/full/g1-taps.webp`, alt: 'Tap wall and a bowl of brewing grain' },
  { src: `${B}/strip/g2-sightglass.webp`, full: `${B}/full/g2-sightglass.webp`, alt: 'Beer running through the brewery sight glass' },
  { src: `${B}/strip/g3-flag.webp`, full: `${B}/full/g3-flag.webp`, alt: 'A Flying Ace Farm beer beside the American flag' },
  { src: `${B}/strip/g4-river.webp`, full: `${B}/full/g4-river.webp`, alt: 'Two cans raised together by the river' },
  { src: `${B}/strip/g5-kettle.webp`, full: `${B}/full/g5-kettle.webp`, alt: 'Inside the brew kettle' },
  { src: `${B}/strip/g6-cranberry.webp`, full: `${B}/full/g6-cranberry.webp`, alt: 'A seasonal pour with cranberries' },
];
