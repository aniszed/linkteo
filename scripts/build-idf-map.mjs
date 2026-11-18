/**
 * Génère src/data/idf-map.ts : contours SVG des 8 départements d'Île-de-France.
 *
 * Source : france-geojson (version simplifiée), dérivée d'IGN Admin Express,
 * Licence Ouverte / Etalab. https://github.com/gregoiredavid/france-geojson
 *
 * Usage : node scripts/build-idf-map.mjs <chemin/departements-version-simplifiee.geojson>
 */
import fs from 'node:fs';

const src = process.argv[2];
if (!src) {
  console.error('Usage : node scripts/build-idf-map.mjs <departements.geojson>');
  process.exit(1);
}
const CODES = ['75', '77', '78', '91', '92', '93', '94', '95'];
const geo = JSON.parse(fs.readFileSync(src, 'utf8'));
const feats = geo.features.filter((f) => CODES.includes(String(f.properties.code)));
if (feats.length !== CODES.length) throw new Error(`Départements trouvés : ${feats.length}/${CODES.length}`);

// Projection équirectangulaire corrigée à la latitude moyenne de l'IDF.
const k = Math.cos((48.7 * Math.PI) / 180);
const proj = ([lon, lat]) => [lon * k, -lat];
const rings = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.coordinates);

let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
for (const f of feats) for (const poly of rings(f.geometry)) for (const [x, y] of poly[0].map(proj)) {
  minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
}
const W = 600, PAD = 8;
const s = (W - 2 * PAD) / (maxX - minX);
const H = Math.round((maxY - minY) * s + 2 * PAD);
const tx = ([x, y]) => [(x - minX) * s + PAD, (y - minY) * s + PAD];
const r1 = (n) => Math.round(n * 10) / 10;

const out = feats.map((f) => {
  let d = '', A = 0, Cx = 0, Cy = 0;
  for (const poly of rings(f.geometry)) {
    for (const ring of poly) {
      const pts = ring.map((p) => tx(proj(p)));
      d += 'M' + pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join('L') + 'Z';
    }
    const pts = poly[0].map((p) => tx(proj(p)));
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
      const c = x0 * y1 - x1 * y0;
      A += c; Cx += (x0 + x1) * c; Cy += (y0 + y1) * c;
    }
  }
  A /= 2;
  return { code: String(f.properties.code), d, cx: r1(Cx / (6 * A)), cy: r1(Cy / (6 * A)) };
}).sort((a, b) => CODES.indexOf(a.code) - CODES.indexOf(b.code));

const ts = `// Fichier généré par scripts/build-idf-map.mjs — ne pas modifier à la main.
// Contours : IGN Admin Express via france-geojson, Licence Ouverte / Etalab.
export const idfViewBox = '0 0 ${W} ${H}';
export const idfDepartements: { code: string; d: string; cx: number; cy: number }[] = ${JSON.stringify(out, null, 1)};
`;
fs.writeFileSync(new URL('../src/data/idf-map.ts', import.meta.url), ts);
console.log(`OK : ${out.length} départements, viewBox 0 0 ${W} ${H}, ${(ts.length / 1024).toFixed(1)} Ko`);
