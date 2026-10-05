/**
 * Restaurant (Monk's on the Farm) page content.
 *
 * Transcribed from the Restaurant — Desktop artboard
 * (project/Restaurant.dc.html) and cross-checked against
 * flyingacefarm.com/menu-online-ordering/.
 *
 * The live site publishes its menus as flat PNGs
 * (MONKS-WINTER-MENU-2026-12.png, COCKTAIL-MENU-11.png). The canvas build
 * note calls for rebuilding those as HTML text for SEO and accessibility,
 * which is what the artboard does and what is reproduced here — a screen
 * reader and a search engine can both read these prices.
 *
 * Prices change. This file is the one to hand to whoever maintains the menu.
 */

export const ORDER_ONLINE = 'https://order.toasttab.com/online/flying-ace-farm-40950-flying-ace-ln';

export const restaurantHero = {
  eyebrow: 'Restaurant · BBQ & American fare',
  title: 'Monk’s on the Farm',
  lede: 'Online food ordering shows what’s available in real time. Order ahead to guarantee an item is in stock.',
  image: '/images/restaurant.jpg',
  alt: 'The Monk’s on the Farm sign at Flying Ace Farm',
  logo: '/images/restaurant/monks-logo.png',
  logoAlt: 'Monk’s on the Farm logo',
};

export const weeklySpecials = [
  {
    day: 'Wed',
    title: '$8 Margaritas · Kids Eat Free',
    body: 'One free kids’ meal per adult entrée purchase (child and adult must be present), plus a weekly food special.',
  },
  {
    day: 'Thu',
    title: 'Burger & Beer',
    body: 'Burger of the Week ($15.99) or Regular Double Smashburger ($13.99), each with your choice of one side.',
  },
  {
    day: 'Fri',
    title: 'Friday Special & Free Beer',
    body: 'A food special and free beer starting at 3pm, until sold out.',
  },
];

/**
 * A menu group renders as a table. `cols` are the price column headings;
 * each item's `prices` array lines up with them. A `note` is the italic line
 * under an item; `adds` are the "+$3" upsells.
 */
export type MenuGroup = {
  title: string;
  intro?: string;
  cols: string[];
  items: {
    name: string;
    prices: (string | null)[];
    note?: string;
    adds?: string;
    indent?: boolean;
  }[];
};

export const foodMenu: MenuGroup[] = [
  {
    title: 'Entrées',
    intro: 'Includes one side. Substitute cornbread for sandwich bun +$2.',
    cols: ['Entrée', '1 lb'],
    items: [
      { name: 'Brisket', prices: ['$17.49', '$33.99'] },
      { name: 'Pastrami', prices: ['$18.49', '$35.99'] },
      { name: 'Pulled Pork', prices: ['$14.99', '$26.99'] },
      { name: 'Burnt Ends', prices: ['$18.49', '$34.99'] },
      { name: 'Smoked Boneless Chicken Thigh', prices: ['$14.99', null] },
      {
        name: 'Deluxe Smoked Boneless Chicken Thigh',
        prices: ['$15.99', null],
        note: 'Pepper jack cheese / lettuce / tomato / onion / pickle / garlic aioli / brioche bun',
        adds: 'Add bacon +$3',
      },
      { name: '1/4 lb Hot Dog', prices: ['$11.99', null], adds: 'Add chili, cheese & onions +$2' },
      {
        name: 'Double Smashburger',
        prices: ['$17.99', null],
        note: 'American cheese / lettuce / tomato / onion / pickle / garlic aioli',
        adds: 'Add bacon +$3',
      },
      {
        name: 'Black Bean Burger',
        prices: ['$14.99', null],
        note: 'Pepper jack cheese / salsa / red onion / lettuce / farmhouse aioli',
      },
      {
        name: 'Kid’s Meal',
        prices: ['$10.99', null],
        note: 'Brisket, pastrami, pulled pork, single smashburger, 1/2 chicken thigh, hot dog',
      },
    ],
  },
  {
    title: 'Sides',
    cols: ['Side', 'Pt', 'Qt'],
    items: [
      { name: 'Potato Salad', prices: ['$4.99', '$10.99', '$19.99'] },
      { name: 'Vinegar Slaw', prices: ['$4.99', '$9.49', '$15.99'] },
      { name: 'Monk’s Beans', prices: ['$4.99', '$10.99', '$19.99'] },
      { name: 'Smoked Gouda Mac & Cheese', prices: ['$4.99', '$10.99', '$19.99'] },
      { name: 'Applewood Smoked Mushrooms', prices: ['$4.99', '$10.99', '$19.99'] },
      { name: 'Pickles', prices: ['$4.99', '$9.99', '$18.99'] },
      { name: 'Green Beans', prices: ['$4.99', '$10.99', '$19.99'] },
      { name: 'Custard Filled Cornbread', prices: ['$4.49', null, null] },
    ],
  },
  {
    title: 'Desserts',
    cols: [''],
    items: [
      { name: 'Banana Pudding', prices: ['$7.99'] },
      { name: 'Dirt Pudding', prices: ['$7.99'] },
      { name: 'Cinnamon Sugar Pretzel', prices: ['$14.99'] },
      { name: 'Frozen Treat', prices: ['$5.49'] },
    ],
  },
  {
    title: 'Extras',
    cols: [''],
    items: [
      { name: 'Giant Pretzel', prices: ['$13.99'] },
      { name: 'Memphis Nachos', prices: ['$15.49'] },
      { name: '— Pork', prices: ['$17.49'], indent: true },
      { name: '— Brisket or Pastrami', prices: ['$19.49'], indent: true },
      { name: 'Summer Berry Salad', prices: ['$15.49'] },
      { name: '— Pork', prices: ['$17.49'], indent: true },
      { name: '— Brisket or Pastrami', prices: ['$19.49'], indent: true },
    ],
  },
];

export const drinksIntro =
  'Restaurant cocktails are served in our main barn, alongside craft beer on tap and wine from Walsh Family Winery.';

export const drinksMenu: MenuGroup[] = [
  {
    title: 'Straight Pours',
    cols: ['1 oz', '2 oz'],
    items: [
      { name: '90 Proof Bourbon', prices: ['$6.99', '$13.99'] },
      { name: 'Cask Strength Bourbon', prices: ['$11.50', '$22.99'] },
      { name: 'Rum', prices: ['$4.99', '$9.99'] },
      { name: 'White Dog', prices: ['$4.99', '$9.99'] },
    ],
  },
  {
    title: 'Cocktails',
    cols: [''],
    items: [
      { name: 'Old Fashioned', prices: ['$15.99 / $23.99'] },
      { name: 'Bourbon Smash / Blackberry Smash', prices: ['$13.99'] },
      { name: 'Bloody Mary', prices: ['$11.99'] },
      { name: 'Crush', prices: ['$11.99'], note: 'Orange / grapefruit / watermelon' },
      { name: 'Margarita', prices: ['$12.99'], note: 'House / spicy / watermelon / apple cider' },
      { name: 'Mimosa', prices: ['$7.99'], note: 'Orange / pineapple / cranberry' },
      { name: 'Mule', prices: ['$12.99'], note: 'Moscow / cranberry / apple cider' },
      { name: 'Kentucky Mule', prices: ['$13.99'] },
      { name: 'Mojito', prices: ['$11.99'], note: 'Mint / pineapple / watermelon' },
      { name: 'Paloma', prices: ['$12.99'], note: 'Tequila / mezcal' },
      { name: 'Rum Punch', prices: ['$12.99'] },
    ],
  },
  {
    title: 'Wine',
    cols: ['6 oz'],
    items: [
      { name: 'Red', prices: ['$13.99'] },
      { name: 'White', prices: ['$11.99'] },
      { name: 'Rosé', prices: ['$11.99'] },
    ],
  },
  {
    title: 'Mocktails',
    cols: [''],
    items: [
      { name: 'Mojito', prices: ['$7.99'], note: 'Mint / pineapple / watermelon' },
      { name: 'Shirley Temple', prices: ['$3.99'] },
      { name: 'Dirty Soda', prices: ['$4.99'] },
      { name: 'Strawberry Lemonade / Blackberry Lemonade', prices: ['$6.99'] },
      { name: 'Iced Apple Cider', prices: ['$4.99 / $6.99'], note: '12 oz / 16 oz' },
    ],
  },
  {
    title: 'To-Go Beer',
    cols: [''],
    items: [
      { name: '6-Pack Beers', prices: ['$14.99'] },
      { name: 'Crowlers (16 oz)', prices: ['$8.99'] },
      { name: 'Mix & Match Crowlers, 4-Pack', prices: ['$23.99'] },
    ],
  },
];

export const goodToKnow = [
  {
    icon: 'calendar' as const,
    title: 'No reservations needed',
    body: 'Plenty of indoor and outdoor seating. For group tables, email events@flyingacefarm.com.',
  },
  {
    icon: 'barn' as const,
    title: 'Kids & dogs welcome',
    body: 'Kids eat free on Wednesdays, and there’s a playground. Leashed dogs are welcome outdoors.',
  },
  {
    icon: 'store' as const,
    title: 'No outside food or drink',
    body: 'With the exception of birthday cakes.',
  },
];
