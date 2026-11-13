// Projetos: abas (setas do teclado trocam de aba) e um modal por card.
import { getLenis } from './nav';

export function initProjects() {
  const tabs = [...document.querySelectorAll<HTMLButtonElement>('.tabs [role="tab"]')];
  const select = (t: HTMLButtonElement) => tabs.forEach((x) => {
    const on = x === t;
    x.setAttribute('aria-selected', String(on));
    x.tabIndex = on ? 0 : -1;
    document.getElementById(x.getAttribute('aria-controls')!)!.hidden = !on;
  });
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      select(n); n.focus();
    });
  });

  const modal = document.getElementById('pmodal') as HTMLDialogElement | null;
  if (!modal) return;
  const $ = (id: string) => document.getElementById(id)!;
  document.querySelectorAll<HTMLElement>('.pcard').forEach((card) => card.addEventListener('click', () => {
    const d = card.dataset;
    $('pmTitle').textContent = d.title ?? '';
    $('pmType').textContent = d.type ?? '';
    $('pmDesc').textContent = d.desc ?? '';
    // a mesma imagem do card, mas pedindo uma versão maior ao navegador
    const pic = card.querySelector('picture')?.cloneNode(true) as HTMLElement | undefined;
    if (pic) {
      pic.querySelectorAll<HTMLImageElement | HTMLSourceElement>('img, source').forEach((el) => el.setAttribute('sizes', '(max-width: 800px) 100vw, 760px'));
      pic.querySelector('img')?.setAttribute('loading', 'eager');
      $('pmShot').replaceChildren(pic);
    }
    // "Ver online" só aparece quando o projeto tem link
    $('pmActions').hidden = !d.url;
    if (d.url) ($('pmLink') as HTMLAnchorElement).href = d.url;
    modal.showModal();
    getLenis()?.stop();
  }));
  $('pmClose').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', () => getLenis()?.start());
}
