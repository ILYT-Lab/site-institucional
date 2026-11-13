// Animações de rolagem (GSAP + ScrollTrigger) e rolagem suave (Lenis). Carregado depois da primeira tela.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import type { Goals } from './goals';

export function initMotion(goals: Goals) {
  gsap.registerPlugin(ScrollTrigger);
  goals?.useGsap(gsap);
  const desktop = matchMedia('(min-width: 1001px)').matches;
  const SNAP = 'back.out(1.6)';

  const lenis = ((window as any).lenis = new Lenis({ lerp: 0.1 }));
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')!;
      if (id.length < 2) return;
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      // o conteúdo da seção (não o respiro de cima) para 140px abaixo do topo da tela
      e.preventDefault();
      lenis.scrollTo(el, { offset: parseFloat(getComputedStyle(el).paddingTop) - 140 });
    }),
  );

  // hero: a imagem desce mais devagar que a página
  gsap.to('#hero .ph.fill', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });

  // história: cada linha é riscada ao passar de 45% (desktop) / 35% (celular) da tela, e desriscada ao voltar.
  // linhas que disparam juntas entram numa fila de 0,35s, para sempre riscarem uma depois da outra
  let nextSlot = 0;
  const timers = new WeakMap<HTMLElement, number>();
  const strike = (s: HTMLElement, on: boolean) => {
    clearTimeout(timers.get(s));
    const now = performance.now();
    const at = Math.max(now, nextSlot);
    nextSlot = at + 350;
    timers.set(s, window.setTimeout(() => s.classList.toggle('on', on), at - now));
  };
  // sem JavaScript as linhas já aparecem riscadas; aqui elas voltam ao normal e passam a seguir a rolagem
  document.querySelectorAll<HTMLElement>('.tale li span').forEach((s) => {
    s.classList.remove('on');
    ScrollTrigger.create({
      trigger: s,
      start: desktop ? 'bottom 45%' : 'bottom 35%',
      onEnter: () => strike(s, true),
      onLeaveBack: () => strike(s, false),
    });
  });
  gsap.from('.tale-end > *', { opacity: 0, y: 24, duration: 0.9, stagger: 0.15, ease: 'expo.out', scrollTrigger: { trigger: '.tale-end', start: 'top 80%', once: true } });

  // como trabalhamos: a linha âmbar desce com a leitura e os números acendem
  gsap.fromTo('#workFill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#work', start: 'top 70%', end: 'bottom 60%', scrub: true } });
  document.querySelectorAll<HTMLElement>('.wrow').forEach((r) =>
    ScrollTrigger.create({
      trigger: r,
      start: 'top 66%',
      once: true,
      onEnter: () => {
        gsap.to(r.querySelector('.n'), { color: '#ffb020', duration: 0.4 });
        const wa = r.querySelector('.wa');
        if (wa) gsap.from(wa, { y: 30, rotate: 1.5, opacity: 0, duration: 0.8, delay: 0.2, ease: SNAP });
      },
    }),
  );

  gsap.from('.risk .days', { yPercent: 30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.risk', start: 'top 75%', once: true } });

  // rodapé: as peças da logo se encaixam
  const pieces = document.querySelectorAll('.foot-logo .pc');
  const offs = [[-40, 30, -12], [-20, 60, 8], [-6, -60, -16], [16, 70, 10], [36, -50, 6], [40, 40, -14]];
  if (pieces.length)
    ScrollTrigger.create({
      trigger: '.foot-logo',
      start: 'top 92%',
      once: true,
      onEnter: () =>
        pieces.forEach((p, i) =>
          gsap.from(p, { xPercent: offs[i][0], yPercent: offs[i][1], rotate: offs[i][2], transformOrigin: '50% 50%', opacity: 0, duration: 0.75, delay: i * 0.14, ease: SNAP }),
        ),
    });
}
