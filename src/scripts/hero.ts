// Hero: um cursor com a etiqueta "ILYT" traz as últimas palavras do título.
// As palavras animam em CSS; o cursor acompanha a animação de "o seu bolso exige." no mesmo relógio.
export function initHeroCursor() {
  const hero = document.getElementById('hero');
  const kw = document.getElementById('kw');
  if (!hero || !kw || !kw.animate) return;

  // posição final da palavra, sem a transformação da animação (offset* ignora transform)
  let x = 0;
  let y = 0;
  let el: HTMLElement | null = kw;
  while (el && el !== hero) {
    x += el.offsetLeft;
    y += el.offsetTop;
    el = el.offsetParent as HTMLElement | null;
  }
  const kx = x + kw.offsetWidth * 0.9;
  const ky = y + kw.offsetHeight * 0.55;

  const cur = document.createElement('div');
  cur.className = 'cursor';
  cur.setAttribute('aria-hidden', 'true');
  cur.innerHTML = '<svg viewBox="0 0 18 18"><path d="M2 1.5 L15 8.5 L9 10 L6.5 16 Z"/></svg><span>ILYT</span>';
  hero.appendChild(cur);

  const at = (dx: number, dy: number) => `translate(${kx + dx}px, ${ky + dy}px)`;
  const flight = cur.animate(
    [
      { transform: at(260, -180), opacity: 0, easing: 'cubic-bezier(.16, 1, .3, 1)' },
      { transform: at(0, 0), opacity: 1, offset: 0.542 },
      { transform: at(0, 0), opacity: 1, offset: 0.759, easing: 'cubic-bezier(.5, 0, .75, 0)' },
      { transform: at(18, 22), opacity: 0 },
    ],
    { duration: 1660, delay: 1100, fill: 'both' },
  );

  // mesmo ponto de partida da animação CSS da palavra
  const css = kw.getAnimations()[0];
  if (css && css.startTime !== null) flight.startTime = css.startTime;
  flight.finished.then(() => cur.remove());
}
