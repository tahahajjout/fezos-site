# Fezo's Beauty Lounge — site vitrine (démo)

Site one-page pour **Fezo's Beauty Lounge**, salon de beauté à Fès. Vite + React 19, Tailwind CSS v4, Motion, Lucide.
Réservation par WhatsApp (pas de backend). Français, anglais et arabe (RTL).

> **Démo** — non indexée (`noindex` + `robots.txt`) tant que la propriétaire n'a pas validé.

## Lancer

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # production → dist/
npm run preview        # sert dist/
npm test               # formats, horaires, réservation (node, sans framework)
npm run check:images   # vérifie que chaque image de src/data/images.js charge
```

## Déployer (Vercel)

Importer le dépôt GitHub dans Vercel (framework : Vite, aucun réglage). Chaque `git push` redéploie.
`vercel.json` ajoute les en-têtes de sécurité (CSP, HSTS, X-Frame-Options…) et le cache des assets.

**Au lancement officiel :**
1. Supprimer la ligne `<meta name="robots" content="noindex, nofollow">` dans `index.html`.
2. Supprimer `public/robots.txt` (ou le remplacer par `Allow: /`).
3. Mettre le vrai domaine dans `salon.url` (`src/data/salon.js`) — il alimente canonical, hreflang et Open Graph.

## Modifier le contenu

| Quoi | Où |
|---|---|
| Adresse, téléphone, WhatsApp, horaires, note Google | `src/data/salon.js` → `salon`, `hours` |
| Soins, prix, durées | `src/data/salon.js` → `serviceCategories` (`price: null` = « Sur demande ») |
| Packs, promesses, avis | `src/data/salon.js` → `packs`, `promises`, `reviews` |
| Offre du moment | `src/data/salon.js` → `offer` (`startsAt` / `endsAt`, masquée automatiquement après) |
| Photos | `src/data/images.js` (id Unsplash ou fichier local) |
| Textes de l'interface | `src/i18n/fr.js`, `en.js`, `ar.js` |

Chaque texte de `salon.js` existe en trois langues : `{ fr, en, ar }`. `confirmed: false` marque une donnée
provisoire à faire valider (prix, prénoms des avis).

**Panorama 360°** : remplacer `images.panorama` par une vraie photo panoramique du salon et passer `mirror: false`.
**Couleur d'accent** : `--color-champagne*` dans `src/index.css` (une ligne pour passer à l'orange Fezo's).

## Structure

```
src/
  data/        salon.js (contenu), images.js (photos)
  i18n/        fr / en / ar + useLang()
  lib/         booking (créneaux, validation), whatsapp (message), format, time (+ tests *.test.mjs)
  hooks/       useDialog, useOpenStatus, useScrollHeader, useDragScroll
  components/  ui/ (briques réutilisables), sections/ (une section de page par fichier)
```

---
Démo réalisée par Taha Hajjout — proposition de site web.
