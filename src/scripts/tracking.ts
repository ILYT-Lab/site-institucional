// Conversão: cada clique num botão do WhatsApp vira o evento "clique_whatsapp", com o local do botão.
// Vai para o dataLayer (Google Tag Manager: GA4, Google Ads, Meta, TikTok) e para o Umami, quando ativos.
export function initTracking() {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLElement>('[data-cta]');
    if (!a) return;
    const local = a.dataset.cta;
    w.dataLayer.push({ event: 'clique_whatsapp', cta_local: local });
    w.umami?.track?.('clique_whatsapp', { local });
  });
}
