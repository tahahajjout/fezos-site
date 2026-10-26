// All imagery in one place — swap ids (or replace `url()` with local files) when
// the salon's real photos arrive. Every id verified by `npm run check:images`.
const BASE = 'https://images.unsplash.com/photo-'
const WIDTHS = [480, 640, 768, 1080, 1600, 2400, 3200, 4000]

/** Cropped URL at width `w` for aspect ratio [rw, rh]. */
export function url(img, w, [rw, rh] = [4, 5]) {
  return `${BASE}${img.id}?auto=format&fit=crop&w=${w}&h=${Math.round((w * rh) / rw)}&q=80`
}

/** srcSet string for <img srcSet>, capped at `max` width. */
export function srcSet(img, ratio, max = 2400) {
  return WIDTHS.filter((w) => w <= max).map((w) => `${url(img, w, ratio)} ${w}w`).join(', ')
}

export const images = {
  hero: { id: '1515377905703-c4788e51af15', alt: 'Mains déposant une goutte d’huile de soin, lumière chaude et tamisée' },
  lounge: { id: '1600210492486-724fe5c67fb0', alt: 'Salon lumineux aux tons crème, fauteuils et plantes' },
  finalCta: { id: '1556760544-74068565f05c', alt: 'Flacons d’huiles et bougie sur une table en bois' },
  gift: { id: '1608571423902-eed4a5ad8108', alt: 'Flacon de sérum ambré sur un socle en bois, ombre de palme' },

  // 360° viewer — cropped very wide; placeholder until the real salon panorama
  // mirror: the stand-in is a plain wide photo whose edges don't meet, so the viewer alternates it
  // with a flipped copy to loop without a seam. Set to false for a real 360° panorama.
  panorama: {
    id: '1618221195710-dd6b41faaea6',
    alt: 'Espace lounge chaleureux baigné de lumière naturelle',
    ratio: [10, 3],
    mirror: true,
  },

  treatments: {
    coiffure: { id: '1580618672591-eb180b1a973f', alt: 'Coiffeuse réalisant un brushing sur cheveux longs' },
    onglerie: { id: '1607779097040-26e80aa78e66', alt: 'Ongles nude et pailletés sur une maille crème' },
    pedicure: { id: '1519415510236-718bdfcd89c8', alt: 'Pieds dans un bain de fleurs avant une pédicure' },
    visage: { id: '1570172619644-dfd03ed5d881', alt: 'Application d’un masque visage au pinceau' },
  },

  packs: {
    mariee: { id: '1487412947147-5cebf100ffc2', alt: 'Mise en beauté d’une mariée, rouge à lèvres rosé' },
    mainsPieds: { id: '1610992015732-2449b76344bc', alt: 'Mains manucurées posées sur une fourrure douce' },
    eclat: { id: '1616394584738-fc6e612e71b9', alt: 'Soin visage hydratant en cabine' },
    rentree: { id: '1562322140-8baeececf3df', alt: 'Brushing en salon devant une grande fenêtre' },
  },

  // ratio drives the editorial masonry: mix of 4:5, 1:1, 16:9. Order balances the 3 CSS columns.
  gallery: [
    { id: '1610992015732-2449b76344bc', alt: 'Manucure naturelle aux tons rosés', ratio: [4, 5] },
    { id: '1620916566398-39f1143ab7be', alt: 'Crème de soin posée sur du lin blanc', ratio: [1, 1] },
    { id: '1580618672591-eb180b1a973f', alt: 'Brushing en cours sur cheveux châtains', ratio: [16, 9] },
    { id: '1617897903246-719242758050', alt: 'Sérum doré et branche d’eucalyptus', ratio: [4, 5] },
    { id: '1619451334792-150fd785ee74', alt: 'Mains tenant un pot de gel hydratant', ratio: [4, 5] },
    { id: '1576426863848-c21f53c60b19', alt: 'Flacon compte-gouttes sur marbre clair', ratio: [1, 1] },
    { id: '1631729371254-42c2892f0e6e', alt: 'Flacons de soins capillaires sur plan en marbre', ratio: [16, 9] },
    { id: '1607779097040-26e80aa78e66', alt: 'Ongles lilas et argent sur maille crème', ratio: [1, 1] },
  ],
}
