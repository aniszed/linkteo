/**
 * Liste les TODO restants (informations à fournir avant la mise en ligne).
 * N'échoue jamais : c'est une checklist, pas un test.
 */
import fs from 'node:fs';
import path from 'node:path';

const racine = path.resolve(import.meta.dirname, '..');
const dossiers = ['src', 'public', 'netlify.toml'];
const extensions = new Set(['.ts', '.astro', '.mjs', '.md', '.txt', '.toml', '.css']);
const resultats = [];

function parcourir(p) {
  const stat = fs.statSync(p);
  if (stat.isDirectory()) return fs.readdirSync(p).forEach((f) => parcourir(path.join(p, f)));
  if (!extensions.has(path.extname(p)) && !p.endsWith('.toml')) return;
  fs.readFileSync(p, 'utf8').split('\n').forEach((ligne, i) => {
    const m = ligne.match(/TODO[:\s]*(.*)/);
    if (m) resultats.push(`${path.relative(racine, p)}:${i + 1}  ${m[1].trim() || ligne.trim()}`);
  });
}
dossiers.forEach((d) => fs.existsSync(path.join(racine, d)) && parcourir(path.join(racine, d)));

console.log(resultats.length ? `${resultats.length} TODO restants :\n\n${resultats.join('\n')}` : 'Aucun TODO restant.');
