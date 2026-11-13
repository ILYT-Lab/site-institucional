// Gera os ícones PNG a partir de public/favicon.svg. Rodar com: npm run icons
// (depois de trocar o favicon pela versão oficial)
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url));
const out = (f) => new URL(`../public/${f}`, import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
for (const [file, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(out(file));
}
// versão "maskable" (Android recorta em círculo): o símbolo com mais margem, fundo inteiro
const inner = await sharp(svg, { density: 384 }).resize(400, 400).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#0a0a0b' } })
  .composite([{ input: inner, gravity: 'center' }]).png().toFile(out('icon-maskable-512.png'));
console.log('ícones gerados em public/');
