// Menu do celular, botão flutuante do WhatsApp e rolagem suave para as âncoras.
export function getLenis(): any {
  return (window as any).lenis;
}

export function initNav() {
  const fab = document.getElementById('fab');
  const hero = document.getElementById('hero');
  if (fab) {
    if (hero) new IntersectionObserver(([e]) => fab.classList.toggle('off', e.isIntersecting), { threshold: 0.2 }).observe(hero);
    else fab.classList.remove('off');
  }

  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('menuPanel');
  const bar = document.querySelector<HTMLElement>('.nav');
  if (!btn || !menu || !bar) return;

  // o painel abre 8px abaixo da barra, alinhado às bordas dela
  const place = () => {
    const r = bar.getBoundingClientRect();
    menu.style.setProperty('--menu-top', `${r.bottom + 8}px`);
    menu.style.setProperty('--menu-left', `${r.left}px`);
    menu.style.setProperty('--menu-right', `${document.documentElement.clientWidth - r.right}px`);
  };
  const set = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (open) place();
    menu.hidden = !open;
    menu.classList.toggle('opening', open);
    const lenis = getLenis();
    if (lenis) open ? lenis.stop() : lenis.start();
  };
  addEventListener('resize', () => { if (!menu.hidden) place(); });
  btn.addEventListener('click', () => set(menu.hidden));
  // fase de captura: fecha o menu (e religa a rolagem suave) antes de o link rolar a página
  menu.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) set(false); }, true);
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { set(false); btn.focus(); } });
  matchMedia('(min-width: 1001px)').addEventListener('change', (e) => { if (e.matches) set(false); });
}
