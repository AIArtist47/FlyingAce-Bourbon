/**
 * The farm's gift card.
 *
 * Buying one happens on Toast, which runs the farm's ordering and its card
 * balances. This page does not re-implement that checkout -- it could not take
 * the payment -- so it answers the things the Toast form does not: what the
 * card is good for, what it costs, how it reaches the person it is for, and
 * where to check what is left on one.
 *
 * Everything below the fold is read off the farm's own eGift form at
 * order.toasttab.com, so the amounts and the delivery choices on this page are
 * the amounts and the delivery choices the buyer actually meets. If Toast
 * changes them, this file is the one place to change.
 */

/** The farm's eGift form. Every "buy" on the page goes here. */
export const buyHref = 'https://order.toasttab.com/egiftcards/flying-ace-farm-40950-flying-ace-ln';

/** Toast's balance lookup for this location. */
export const balanceHref = 'https://www.toasttab.com/flying-ace-farm-40950-flying-ace-ln/findcard';

export const giftHero = {
  eyebrow: 'Gift Cards',
  title: 'A day on the farm',
  lede: 'One card for the restaurant, the brewery, the distillery tasting room and the ABC store. Sent by email or text, today or on a morning you pick.',
  /* The farm's own card artwork, lifted from the Toast form and tinted to the
     navy the rest of the site uses. The file ships black on transparency, and
     the card face it sits on is cream, so this is the ink cut. */
  mark: '/images/gift/wordmark-ink.webp',
  markAlt: '',
} as const;

/**
 * The four set amounts on the Toast form, plus the open field beside them.
 *
 * Deliberately not buttons: Toast takes the amount on its own page and there
 * is no link that arrives there with one already chosen. Showing them as a
 * price list tells the buyer what they are walking into without promising a
 * shortcut that does not exist.
 */
export const amounts = ['25', '50', '100', '200'] as const;

export const amountNote = 'Or any amount you like - the form takes a figure of your own.';

/** Where the card spends. The farm's four counters, in the order a visitor meets them. */
export const goodFor = [
  {
    icon: 'fork' as const,
    title: 'The Restaurant',
    body: 'Monk’s BBQ and smashburgers, Wednesday through Sunday.',
  },
  {
    icon: 'beer' as const,
    title: 'The Brewery',
    body: 'Pints and flights in the taproom, six-packs and crowlers to carry out.',
  },
  {
    icon: 'bottle' as const,
    title: 'The Distillery',
    body: 'Tastings and cocktails in the tasting room, Friday through Sunday.',
  },
  {
    icon: 'store' as const,
    title: 'The ABC Store',
    body: 'Bottles of the farm’s own bourbon, whiskey and rum, on site.',
  },
] as const;

/**
 * How the card gets there. The three routes on the Toast form, in its order.
 *
 * "To me first" is the one worth explaining: it is the route for a card you
 * want to hand over yourself, rather than have the farm send on your behalf.
 */
export const delivery = [
  {
    title: 'By email',
    body: 'Straight to their inbox, with whatever note you write on the form.',
  },
  {
    title: 'By text',
    body: 'To their phone, for a present that has to land the same hour.',
  },
  {
    title: 'To you first',
    body: 'Sent to your own inbox, so you can print it or pass it on in person.',
  },
] as const;

/** When it goes. Toast offers exactly these two. */
export const timing = [
  {
    term: 'Today',
    def: 'Sent the moment the order goes through.',
  },
  {
    term: 'Later',
    def: 'Held for a date and a time you choose, down to the morning of a birthday.',
  },
] as const;

export const goodToKnow = [
  'The card is spent at the counter like any other card - nothing to print and nothing to collect first.',
  'You still have to be 21 to buy alcohol with it, card or no card, and the bar will ask.',
  'Balances are held by Toast, who run the farm’s tills. Check one any time with the link below.',
] as const;
