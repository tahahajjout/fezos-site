// Fails (exit 1) if any image in src/data/images.js doesn't load.
import { images, url } from '../src/data/images.js'

const all = Object.entries(images).flatMap(([key, v]) =>
  v.id ? [[key, v]] : Object.entries(v).map(([k, img]) => [`${key}.${k}`, img]),
)
const results = await Promise.all(
  all.map(async ([key, img]) => {
    const res = await fetch(url(img, 480, img.ratio), { method: 'HEAD' })
    return [key, res.status, res.headers.get('content-type')]
  }),
)
const bad = results.filter(([, status, type]) => status !== 200 || !type?.startsWith('image/'))
results.forEach(([key, status]) => console.log(status, key))
console.log(bad.length ? `\n${bad.length} broken image(s)` : `\nAll ${results.length} images OK`)
process.exit(bad.length ? 1 : 0)
