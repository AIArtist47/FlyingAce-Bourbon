/**
 * Content for the Flying Ace Farm home page.
 *
 * Copy is transcribed verbatim from the Home-Desktop artboard (Main.dc.html).
 * Images are served locally from `public/images/`; see `imgOrigin` below for
 * where each file came from on the farm's WordPress host.
 */

/**
 * Served from `public/images/`. Each file is the original from
 * flyingacefarm.com/wp-content/uploads/ - the mapping the canvas IMAGES note
 * specifies for each slot - downloaded so the page carries its own assets
 * instead of depending on the live WordPress host. `origin` records where
 * each one came from, for re-fetching when the farm updates a photo.
 */
export const img = {
  logo: '/images/logo.png',
  heroPoster: '/images/hero-farm.jpg',
  heroVimeo: '502690090',
  distillery: '/images/distillery.jpg',
  brewery: '/images/brewery.jpg',
  restaurant: '/images/restaurant.jpg',
  events: '/images/events.jpg',
  bottles: '/images/bottles.jpg',
  aircraft: '/images/aircraft.jpg',
  wedding: '/images/wedding.jpg',
  privateEvents: '/images/private-events.jpg',
};

const UP = 'https://flyingacefarm.com/wp-content/uploads';

export const imgOrigin: Record<string, string> = {
  'logo.png': `${UP}/2021/05/FA_CircleLogo-main.png`,
  'hero-farm.jpg': `${UP}/2021/10/2507_image_249235232_411068353972128_2141749646596428352_n.jpg`,
  'distillery.jpg': `${UP}/2022/08/IMG_2646_jpg-scaled.jpg`,
  'brewery.jpg': `${UP}/2024/04/IMG_6875-1280x720.jpg`,
  'restaurant.jpg': `${UP}/2024/03/IMG_6229-scaled.jpg`,
  'events.jpg': `${UP}/2024/03/IMG_5234-1-1280x719.jpg`,
  'bottles.jpg': `${UP}/2022/09/Flying_Ace_Farm_-_American_Ace_Cask_Strength_Bourbon_-9-1-22_Award_Winning__4.jpg`,
  'aircraft.jpg': `${UP}/2021/02/Flying-Ace-Farm-4874.jpg`,
  'wedding.jpg': `${UP}/2024/03/2019-11-02-Ashlynn-John-3096-2.jpg`,
  'private-events.jpg': `${UP}/2024/03/IMG_6395-1280x854.jpg`,
};

export const site = {
  name: 'Flying Ace Farm',
  place: 'Lovettsville, Virginia',
  phone: '(540) 579-2007',
  phoneHref: 'tel:+15405792007',
  street: '40950 Flying Ace Ln',
  cityState: 'Lovettsville, VA 20180',
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=40950+Flying+Ace+Ln%2C+Lovettsville%2C+VA+20180',
  /* American Ace ships through SharedPour; there is no basket on this site. */
  spiritsShop: 'https://sharedpour.com/collections/american-ace-spirits',
  /* Monk's takes orders through Toast, likewise. */
  orderFood: 'https://order.toasttab.com/online/flying-ace-farm-40950-flying-ace-ln',
};

/**
 * In the artboard these are cross-page links. On a single landing page each
 * one has to resolve to a distinct vertical band, otherwise several nav items
 * highlight at once - hence #spirits and #weddings rather than the pillar
 * cards that share the one grid row.
 */
export const nav = [
  // Real pages now; the rest are still sections of the home page.
  { label: 'Distillery', href: '/distillery' },
  { label: 'Brewery', href: '/brewery' },
  { label: 'Restaurant', href: '/restaurant' },
  { label: 'Host Your Event', href: '/host-your-event' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Visit & FAQ', href: '/visit' },
];

/**
 * The four accordion panels. `meta` carries two or three hard details that
 * earn the expanded state - every one of them is already stated elsewhere on
 * the canvas (awards bar, hours strip, events and weddings artboards), so
 * nothing here is invented.
 */
export const pillars = [
  {
    id: 'distillery',
    num: '01',
    title: 'Distillery',
    lede: 'American Ace bourbon, whiskey and rum - distilled from grain we grow, store and mill on the property.',
    meta: ['Double Gold, 2021', 'Tasting room', 'On-site ABC store'],
    cta: 'Explore the spirits',
    /* Straight to the shop rather than the distillery page. The panel itself
       is the link, so the whole card goes off-site; /distillery is still in
       the nav on every page. */
    href: site.spiritsShop,
    image: img.distillery,
  },
  {
    id: 'brewery',
    num: '02',
    title: 'Brewery',
    lede: 'Fifteen-plus rotating taps and seltzers, five flagships, and a cream ale brewed with our own Bloody Butcher corn.',
    meta: ['Best of Loudoun Beer, 2025', 'Beer to go'],
    cta: 'See the draft list',
    href: '/brewery',
    image: img.brewery,
  },
  {
    id: 'restaurant',
    num: '03',
    title: 'Monk’s on the Farm',
    lede: 'Monk’s BBQ and smashburgers, Wednesday through Sunday.',
    meta: ['Open Wed – Sun', 'Order online'],
    cta: 'Menu & ordering',
    href: '/restaurant',
    image: img.restaurant,
  },
  {
    id: 'events',
    num: '04',
    title: 'Host Your Event',
    lede: 'Weddings and private parties in the historic barn, the glass-walled pavilion, the farmhouse and the open lawns.',
    meta: ['50′ × 80′ pavilion', 'Farmhouse bridal suite'],
    cta: 'Plan your event',
    href: '/host-your-event',
    image: img.events,
  },
];

export const awards = [
  {
    medal: 'Double Gold',
    comp: '2021 North American Bourbon & Whiskey Competition',
    product: 'Cask Strength Blended Bourbon',
  },
  {
    medal: 'Category Winner',
    comp: '2022 World Whiskies Awards',
    product: 'Cask Strength Blended Bourbon',
  },
  {
    medal: 'Best of Loudoun Beer',
    comp: '2025 Loudoun County Brewers’ Choice',
    product: '“Bloody Butcher” Cream Ale',
  },
  {
    medal: 'Silver',
    comp: '2025 Virginia Craft Beer Cup',
    product: '“Sombeero” Mexican Amber Lager',
  },
];

export const spirits = [
  { name: 'Cask Strength Blended Bourbon', note: 'Double Gold', price: '$64.99' },
  { name: '90 Proof Blended Bourbon', note: 'Silver medal', price: '$44.99' },
  { name: 'Honey Barrel Straight Bourbon', note: 'Limited release', price: '$79.99' },
  { name: 'White Dog', note: 'Silver · World Whiskies', price: '$29.99' },
  { name: 'American Ace Rum', note: 'Bronze medal', price: '$29.99' },
];

/**
 * The farm-to-bottle sequence, transcribed from the Spirits artboard, where it
 * sits between the lineup and the cocktails. It replaces the four-fact
 * "experience" band that used to stand here: every one of those four was
 * already said by a card in the section above it -- the 200-year-old farm, the
 * 60 acres of Bloody Butcher, the music on Friday, Saturday and Sunday and the
 * ABC store -- so the band was the page repeating itself.
 *
 * This says something the rest of the page does not: how the corn in the field
 * becomes the whiskey in the bottle, in five steps and in the farm's order.
 */
export const fieldsToGlass = {
  eyebrow: 'Farm-to-bottle',
  title: 'From our fields to your glass',
  lede: 'Dark red in color and bold in flavor, our heirloom Bloody Butcher corn is grown, harvested and milled on site. Crafted with malted barley and wheat, it gives our whiskey a grain-forward nose with undertones of banana bread and kettle corn.',
  image: '/images/home/fields-to-glass.webp',
  alt: 'The view from the combine cab across standing Bloody Butcher corn to the red barn, the silos and Furnace Mountain behind them',
  steps: [
    { n: '01', title: 'Grow', body: 'Heirloom Bloody Butcher corn planted on the farm.' },
    { n: '02', title: 'Harvest', body: 'Picked from the fields that surround the distillery.' },
    { n: '03', title: 'Store & Mill', body: 'Stored and milled on the property.' },
    { n: '04', title: 'Distill', body: 'Paired with malted barley and wheat and run off our still.' },
    { n: '05', title: 'Bottle', body: 'Straight off the still as White Dog - or aged into bourbon.' },
  ],
};

export const eventCards = [
  {
    id: 'weddings',
    eyebrow: 'Weddings',
    title: 'Love takes flight',
    body: 'Say “I do” in the glass-walled pavilion, get ready in the farmhouse bridal suite, and celebrate with Monk’s BBQ and spirits made steps away.',
    cta: 'Plan your wedding',
    href: '/host-your-event#weddings',
    image: img.wedding,
    alt: 'Wedding at Flying Ace Farm',
  },
  {
    id: 'private-events',
    eyebrow: 'Private & corporate events',
    title: 'Host your event',
    body: 'A historic barn, a 50′ × 80′ enclosed pavilion, the farmhouse and open lawns, with custom brewery and distillery packages.',
    cta: 'Request a date',
    href: '/host-your-event',
    image: img.privateEvents,
    alt: 'Flying Ace Farm',
  },
];

export const restaurantHours = [
  { day: 'Wednesday', time: '3:00 – 8:00pm' },
  { day: 'Thursday', time: '11:30am – 8:00pm' },
  { day: 'Friday', time: '11:30am – 9:00pm' },
  { day: 'Saturday', time: '11:30am – 9:00pm' },
  { day: 'Sunday', time: '11:30am – 8:00pm' },
];

export const distilleryHours = [
  { day: 'Wed & Thu', time: 'Tasting room closed · bottle sales open' },
  { day: 'Friday', time: '11:30am – 8:00pm' },
  { day: 'Saturday', time: '11:30am – 8:00pm' },
  { day: 'Sunday', time: '11:30am – 7:00pm' },
];

export const exploreLinks = [
  { label: 'Visit & FAQ', href: '/visit' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Gift Cards', href: '/gift-cards' },
  { label: 'Careers', href: '/careers' },
  { label: 'Live Music Inquiries', href: '/live-music' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

/** `label` is no longer rendered; it names the mark for screen readers. */
export const social = [
  { label: 'Instagram', icon: 'instagram' as const, href: 'https://www.instagram.com/flyingacefarm/' },
  { label: 'Facebook', icon: 'facebook' as const, href: 'https://www.facebook.com/flyingacefarm/' },
  /* The link is a Maps directions URL, so the mark is Maps, not plain Google. */
  { label: 'Directions on Google Maps', icon: 'googlemaps' as const, href: site.directions },
];
