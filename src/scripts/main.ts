// Entrada dos scripts do site. Tudo inicia depois da primeira tela; as animações de rolagem (GSAP + Lenis), no primeiro gesto.
// Regra de desempenho: nada aqui pode ler medidas da página (scrollY, offsetTop, getBoundingClientRect…)
// antes do primeiro desenho, senão o celular calcula o layout inteiro de uma vez e a nota do Google cai.
import { initNav } from './nav';
import { initProjects } from './projects';
import { initGoals, type Goals } from './goals';
import { initTracking } from './tracking';
import { initHeroCursor } from './hero';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// tudo começa quando o navegador termina a primeira tela e fica livre (menos de 1s depois de abrir);
// rodar antes disso disputa o processador com o primeiro desenho
let goals: Goals = null;
let booted = false;
const boot = () => {
  if (booted) return;
  booted = true;
  initNav();
  initProjects();
  initTracking();
  goals = initGoals(reduce);
  // o cursor mede a posição da palavra com o layout já pronto
  if (!reduce) initHeroCursor();
};
if ('requestIdleCallback' in window) requestIdleCallback(boot, { timeout: 1000 });
else setTimeout(boot, 200);

// as animações de rolagem só fazem sentido quando a pessoa rola: carregam no primeiro gesto.
// Não ler window.scrollY aqui: antes do primeiro desenho isso força o cálculo do layout inteiro (≈300ms no celular).
// Se a página abrir já rolada, o navegador dispara o evento de scroll e as animações carregam do mesmo jeito.
if (!reduce) {
  const events = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown', 'mousemove'];
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    events.forEach((e) => removeEventListener(e, start));
    boot(); // se a pessoa rolar antes do navegador ficar livre, inicia tudo agora
    import('./motion').then((m) => m.initMotion(goals));
  };
  events.forEach((e) => addEventListener(e, start, { passive: true, once: true }));
}
