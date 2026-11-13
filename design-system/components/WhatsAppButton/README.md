Botão flutuante de WhatsApp, fixo no canto inferior direito em todas as páginas.

- Recebe: número (ainda a definir) e uma mensagem inicial pronta, ex.: "Oi! Vim pelo site da ILYT e quero conversar sobre um projeto."
- Desktop: ícone + "Falar no WhatsApp". Celular: só o ícone, com o texto disponível para leitores de tela.
- `amber` + `on-amber`, `radius-piece`, `shadow-piece`. Respeita as áreas seguras do celular (`env(safe-area-inset-*)`).
- Aparece depois que o hero sai da tela, para não competir com o CTA principal.
- Cada clique dispara um evento no Google Analytics (`click_whatsapp`, com a seção de origem).
