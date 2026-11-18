import opentype from 'opentype.js';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });
const NAVY = '#0B1F33', ORANGE = '#FF6A13', WHITE = '#FFFFFF', MUTED = '#A9B7C6';
const fontDir = 'node_modules/@fontsource/space-grotesk/files/';
const bold = opentype.parse(toAB(fs.readFileSync('node_modules/@expo-google-fonts/space-grotesk/700Bold/SpaceGrotesk_700Bold.ttf')));
const medium = opentype.parse(toAB(fs.readFileSync('node_modules/@expo-google-fonts/space-grotesk/500Medium/SpaceGrotesk_500Medium.ttf')));
const f2 = (n) => (Math.round(n * 100) / 100).toString();
const cmds = (cs) => cs.map(c => c.type === 'Z' ? 'Z' : c.type === 'Q' ? 'Q' + [c.x1, c.y1, c.x, c.y].map(f2).join(' ') : c.type === 'C' ? 'C' + [c.x1, c.y1, c.x2, c.y2, c.x, c.y].map(f2).join(' ') : c.type + f2(c.x) + ' ' + f2(c.y)).join('');
function toAB(b) { return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength); }

// Text outlined to a path, with tracking (in em units * size)
function textPath(font, str, x, y, size, tracking = 0) {
  let cx = x; const parts = []; const glyphs = font.stringToGlyphs(str);
  glyphs.forEach((g, i) => {
    parts.push(cmds(g.getPath(cx, y, size).commands));
    let adv = g.advanceWidth * size / font.unitsPerEm;
    if (i < glyphs.length - 1) adv += (font.getKerningValue(g, glyphs[i + 1]) || 0) * size / font.unitsPerEm;
    cx += adv + tracking;
  });
  return { d: parts.join(''), width: cx - tracking - x };
}

// --- Icon A2 (48 x 48 grid): three strands -> splice -> output
const icon = (stroke) => `
  <path d="M2 8C14 8 16 24 24 24M2 24H24M2 40C14 40 16 24 24 24" fill="none" stroke="${stroke}" stroke-width="3" stroke-linecap="round"/>
  <rect x="23" y="18" width="12" height="12" rx="1" fill="${ORANGE}"/>
  <path d="M35 24H46" stroke="${stroke}" stroke-width="4.5" stroke-linecap="round"/>`;

const word = textPath(bold, 'linkteo', 56, 33.5, 28, -0.5);
const W = Math.ceil(56 + word.width + 2);
const logo = (fg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} 48" width="${W * 4}" height="192" role="img" aria-label="Linkteo">
  <title>Linkteo</title>${icon(fg)}
  <path d="${word.d}" fill="${fg}"/>
</svg>
`;
fs.writeFileSync(path.join(OUT, 'linkteo-logo.svg'), logo(NAVY));
fs.writeFileSync(path.join(OUT, 'linkteo-logo-white.svg'), logo(WHITE));
fs.writeFileSync(path.join(OUT, 'linkteo-icon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="192" height="192" role="img" aria-label="Linkteo"><title>Linkteo</title>${icon(NAVY)}
</svg>
`);

// --- Favicon: redrawn for small sizes (thicker strands, wider gaps), navy tile
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${NAVY}"/>
  <path d="M4.5 7C10 7 11 16 14.5 16M4.5 16H14.5M4.5 25C10 25 11 16 14.5 16" fill="none" stroke="${WHITE}" stroke-width="2.6" stroke-linecap="round"/>
  <rect x="14" y="11.5" width="9" height="9" rx="0.8" fill="${ORANGE}"/>
  <path d="M23 16H27.5" stroke="${WHITE}" stroke-width="3.4" stroke-linecap="round"/>
</svg>
`;
fs.writeFileSync(path.join(OUT, 'favicon.svg'), favicon);
// Maskable / touch icon: same mark with more padding (safe zone)
const touch = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${NAVY}"/>
  <g transform="translate(8 8)">
  <path d="M4.5 7C10 7 11 16 14.5 16M4.5 16H14.5M4.5 25C10 25 11 16 14.5 16" fill="none" stroke="${WHITE}" stroke-width="2.6" stroke-linecap="round" transform="scale(1.5)"/>
  <rect x="14" y="11.5" width="9" height="9" rx="0.8" fill="${ORANGE}" transform="scale(1.5)"/>
  <path d="M23 16H27.5" stroke="${WHITE}" stroke-width="3.4" stroke-linecap="round" transform="scale(1.5)"/></g>
</svg>`;
const png = (svg, size, file) => sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png().toFile(path.join(OUT, file));
await png(touch, 180, 'apple-touch-icon.png');
await png(touch, 192, 'icon-192.png');
await png(touch, 512, 'icon-512.png');
await png(favicon, 32, 'favicon-32.png');

// --- Open Graph 1200x630
const ogWord = textPath(bold, 'linkteo', 0, 0, 1, 0).width; // em width
const s = 4; const oy = 140;
const ogWordPath = textPath(bold, 'linkteo', 96 + 56 * s, oy + 33.5 * s, 28 * s, -0.5 * s);
const tag1 = textPath(medium, 'Raccordement, SAV et maintenance fibre optique', 96, 430, 40, 0);
const tag2 = textPath(medium, 'Sous-traitance FTTH · Île-de-France', 96, 488, 40, 0);
const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${NAVY}"/>
  <path d="M96 600H1104" stroke="${ORANGE}" stroke-width="6"/>
  <g transform="translate(96 ${oy}) scale(${s})">${icon(WHITE)}</g>
  <path d="${ogWordPath.d}" fill="${WHITE}"/>
  <path d="${tag1.d}" fill="${WHITE}"/>
  <path d="${tag2.d}" fill="${MUTED}"/>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(path.join(OUT, 'og-image.png'));
console.log('tag1 width', tag1.width.toFixed(0));
fs.writeFileSync(path.join(OUT, 'og-image.svg'), og);

// --- Preview sheet for review (not a deliverable)
const sheet = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560">
  <rect width="1000" height="560" fill="#F5F7F9"/>
  <rect x="20" y="20" width="460" height="160" fill="#fff"/><g transform="translate(50 60) scale(1.7)">${icon(NAVY)}<path d="${word.d}" fill="${NAVY}"/></g>
  <rect x="500" y="20" width="480" height="160" fill="${NAVY}"/><g transform="translate(530 60) scale(1.7)">${icon(WHITE)}<path d="${word.d}" fill="${WHITE}"/></g>
  <rect x="20" y="200" width="460" height="120" fill="#fff"/><g transform="translate(40 240) scale(0.75)">${icon(NAVY)}<path d="${word.d}" fill="${NAVY}"/></g>
  <g transform="translate(300 230)"><svg width="64" height="64" viewBox="0 0 32 32">${favicon.replace(/<\/?svg[^>]*>/g, '')}</svg></g>
  <g transform="translate(390 246)"><svg width="32" height="32" viewBox="0 0 32 32">${favicon.replace(/<\/?svg[^>]*>/g, '')}</svg></g>
  <g transform="translate(440 254)"><svg width="16" height="16" viewBox="0 0 32 32">${favicon.replace(/<\/?svg[^>]*>/g, '')}</svg></g>
  <g transform="translate(500 200) scale(0.4)">${og.replace(/<\/?svg[^>]*>/g, '')}</g>
</svg>`;
await sharp(Buffer.from(sheet)).png().toFile(process.argv[3]);
console.log('wordmark width', word.width.toFixed(1), 'viewBox width', W);
