// Especialidades. Desktop: um palco mostra a cena do item escolhido. Até 1000px: acordeão, cada cena no seu item.
// Sem troca automática: o visitante escolhe o item e a cena roda inteira, no tempo dele.
import { getLenis } from './nav';

export type Goals = { useGsap: (gsap: any) => void } | null;

export function initGoals(reduce: boolean): Goals {
  const goals = document.getElementById('goals');
  if (!goals) return null;
  const items = [...goals.querySelectorAll<HTMLElement>('.goal')];
  const shots = [...goals.querySelectorAll<HTMLElement>('.gshot')];
  const stage = goals.querySelector<HTMLElement>('.goal-stage')!;
  const wide = matchMedia('(min-width: 1001px)');
  let cur = 0;
  let seen = false;
  let pending = false;
  let gsap: any = null;

  // cena em três passos: cada passo sobe, a linha entre eles desce, depois a resposta e o resultado
  const build = (s: HTMLElement) => {
    if (reduce) return;
    if (!gsap) {
      pending = true;
      return;
    }
    const steps = s.querySelectorAll('.step');
    const out = s.querySelector('.late');
    const won = s.querySelector('.won');
    gsap.killTweensOf([...steps, ...s.querySelectorAll('.sline'), out, won]);
    steps.forEach((st, i) => {
      const at = 0.15 + i * 1.2;
      const line = st.querySelector('.sline');
      gsap.fromTo(st, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: at, ease: 'expo.out' });
      if (line) gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.6, delay: at + 0.6, ease: 'none' });
    });
    const end = 0.15 + (steps.length - 1) * 1.2;
    if (out) gsap.fromTo(out, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: end + 0.9, ease: 'expo.out' });
    if (won) gsap.fromTo(won, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: end + 1.7 });
  };

  const show = (n: number) => {
    cur = n;
    items.forEach((it, i) => {
      it.classList.toggle('is-on', i === n);
      it.querySelector('.goal-btn')!.setAttribute('aria-expanded', String(i === n));
    });
    shots.forEach((s, i) => s.classList.toggle('is-on', i === n));
    if (seen) build(shots[n]);
  };

  const place = () => {
    shots.forEach((s, i) => {
      const home = wide.matches ? stage : items[i].querySelector('.goal-in')!;
      if (s.parentElement !== home) home.appendChild(s);
    });
  };

  items.forEach((it, i) =>
    it.querySelector('.goal-btn')!.addEventListener('click', () => {
      if (i === cur) return;
      show(i);
      // acordeão: o item de cima fecha e a página pula; traz o item aberto de volta para baixo do menu
      if (!wide.matches)
        requestAnimationFrame(() => {
          const y = it.getBoundingClientRect().top + window.scrollY - 88;
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(y);
          else window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
        });
    }),
  );
  // a primeira cena roda quando a seção aparece na tela
  const io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting && !seen) {
        seen = true;
        build(shots[cur]);
        io.disconnect();
      }
    },
    { threshold: 0.35 },
  );
  io.observe(goals);
  wide.addEventListener('change', place);
  place();

  return {
    useGsap(g) {
      gsap = g;
      if (pending) {
        pending = false;
        build(shots[cur]);
      }
    },
  };
}
