// Lyo: mascote flutuante e janela de chat. Por enquanto só a parte visual: a resposta é fixa e leva ao WhatsApp.
// Quando a IA entrar, trocar a função reply() pela chamada ao serviço.
import { whatsappUrl } from '../config/site';

export function initLyo(reduce: boolean) {
  const root = document.getElementById('lyo');
  const btn = document.getElementById('lyo-btn');
  const chat = document.getElementById('lyo-chat');
  if (!root || !btn || !chat) return;
  const bubble = document.getElementById('lyo-bubble')!;
  const msgs = document.getElementById('lyo-msgs')!;
  const quick = document.getElementById('lyo-quick');
  const form = document.getElementById('lyo-form') as HTMLFormElement;
  const input = document.getElementById('lyo-input') as HTMLTextAreaElement;
  const big = document.getElementById('lyo-big')!;
  const eyes = [...btn.querySelectorAll<HTMLElement>('.lyo-eye')];
  let open = false;
  let visible = false;

  // aparece depois da primeira tela (na hero já existe o botão principal)
  const hero = document.getElementById('hero');
  const setVisible = (v: boolean) => {
    visible = v;
    root.classList.toggle('off', !v);
    if (v) firstBubble();
  };
  if (hero) new IntersectionObserver(([e]) => setVisible(!e.isIntersecting), { threshold: 0.2 }).observe(hero);
  else setVisible(true);

  // balão "Posso ajudar você?": aparece poucas vezes para não incomodar
  let bubbles = 0;
  let bubbleTimer = 0;
  const showBubble = (ms = 4000) => {
    if (open || !visible) return;
    bubble.classList.add('show');
    clearTimeout(bubbleTimer);
    bubbleTimer = window.setTimeout(() => bubble.classList.remove('show'), ms);
  };
  let started = false;
  function firstBubble() {
    if (started) return;
    started = true;
    const tick = () => {
      if (bubbles >= 3) return;
      bubbles++;
      showBubble();
      setTimeout(tick, 45000);
    };
    setTimeout(tick, 2500);
  }
  btn.addEventListener('mouseenter', () => showBubble(60000));
  btn.addEventListener('mouseleave', () => bubble.classList.remove('show'));

  if (!reduce) {
    // pisca em intervalos aleatórios (às vezes duas vezes seguidas)
    const blink = () => {
      btn.classList.add('blink');
      setTimeout(() => btn.classList.remove('blink'), 140);
    };
    const blinkLoop = () =>
      setTimeout(() => {
        if (visible && !open && !document.hidden) {
          blink();
          if (Math.random() < 0.25) setTimeout(blink, 280);
        }
        blinkLoop();
      }, 2200 + Math.random() * 3300);
    blinkLoop();

    // balança com pausas: às vezes mexe, às vezes fica parado
    const sway = () =>
      setTimeout(() => {
        if (visible && !open && !document.hidden && !btn.matches(':hover')) {
          const loops = Math.random() < 0.6 ? 1 : 2;
          btn.style.setProperty('--loops', String(loops));
          btn.classList.add('moving');
          setTimeout(() => btn.classList.remove('moving'), loops * 3000 + 50);
          setTimeout(sway, loops * 3000);
        } else sway();
      }, 2500 + Math.random() * 5000);
    sway();

    // olhos acompanham o cursor (um cálculo por quadro, só com o mascote na tela)
    let mx = 0;
    let my = 0;
    let queued = false;
    addEventListener(
      'mousemove',
      (e) => {
        mx = e.clientX;
        my = e.clientY;
        if (queued || !visible || open) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          const r = btn.getBoundingClientRect();
          const dx = mx - (r.left + r.width / 2);
          const dy = my - (r.top + r.height * 0.4);
          const d = Math.hypot(dx, dy) || 1;
          const k = Math.min(1, d / 400);
          eyes.forEach((el) => (el.style.translate = `${(dx / d) * 3 * k}px ${(dy / d) * 2.5 * k}px`));
        });
      },
      { passive: true },
    );
  }

  // abrir e fechar
  const setOpen = (v: boolean) => {
    open = v;
    btn.setAttribute('aria-expanded', String(v));
    root.classList.toggle('open', v);
    bubble.classList.remove('show');
    if (v) {
      chat.hidden = false;
      requestAnimationFrame(() => chat.classList.add('open'));
      // no celular, abrir o teclado sozinho cobre a conversa
      if (matchMedia('(pointer: fine)').matches) setTimeout(() => input.focus(), 50);
      else (document.getElementById('lyo-close') as HTMLElement).focus();
    } else {
      chat.classList.remove('open');
      setTimeout(() => {
        if (!open) chat.hidden = true;
      }, reduce ? 0 : 250);
      btn.focus();
    }
  };
  btn.addEventListener('click', () => setOpen(true));
  document.getElementById('lyo-close')!.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) setOpen(false);
  });

  // ampliar
  big.addEventListener('click', () => {
    const on = !chat.classList.contains('big');
    chat.classList.toggle('big', on);
    big.setAttribute('aria-pressed', String(on));
    big.setAttribute('aria-label', on ? 'Reduzir o chat' : 'Ampliar o chat');
    big.title = on ? 'Reduzir' : 'Ampliar';
  });

  // mensagens
  const scroll = () => (msgs.scrollTop = msgs.scrollHeight);
  const add = (text: string, who: 'me' | 'bot') => {
    const p = document.createElement('p');
    p.className = `lyo-msg ${who}`;
    p.textContent = text;
    msgs.appendChild(p);
    scroll();
    return p;
  };
  const reply = () => {
    const typing = document.createElement('p');
    typing.className = 'lyo-msg bot typing';
    typing.setAttribute('aria-label', 'Lyo está digitando');
    typing.innerHTML = '<i></i><i></i><i></i>';
    msgs.appendChild(typing);
    scroll();
    setTimeout(() => {
      typing.remove();
      const p = add('Ainda estou aprendendo sobre a ILYT. Enquanto isso, fale com a nossa equipe pelo WhatsApp: respondemos em até 24 horas.', 'bot');
      const a = document.createElement('a');
      a.className = 'btn btn-primary lyo-wa';
      a.href = whatsappUrl();
      a.target = '_blank';
      a.rel = 'noopener';
      a.dataset.cta = 'chat-lyo';
      a.textContent = 'Continuar no WhatsApp';
      p.after(a);
      scroll();
    }, 1200);
  };
  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    quick?.remove();
    add(t, 'me');
    input.value = '';
    grow();
    reply();
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    send(input.value);
  });
  // Enter envia; Shift+Enter quebra a linha
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      send(input.value);
    }
  });
  const grow = () => {
    input.style.height = 'auto';
    // +2: a borda (box-sizing: border-box); a barra de rolagem só aparece passando do máximo
    const h = input.scrollHeight + 2;
    input.style.height = `${Math.min(h, 140)}px`;
    input.style.overflowY = h > 140 ? 'auto' : 'hidden';
  };
  input.addEventListener('input', grow);
  quick?.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest('button');
    if (b) send(b.textContent || '');
  });
}
