Aviso temporário que confirma uma ação: envio de formulário, e-mail copiado ou erro de envio.

- Recebe: tipo (sucesso, informação, erro), título curto e uma frase com o próximo passo.
- Aparece no canto inferior direito (no celular, embaixo, largura total menos `space-4`), acima do botão do WhatsApp.
- Fundo `surface-raised`, `radius-md`, `shadow-piece`. Ícone: `success`, `amber` ou `danger`, sempre com texto.
- Entra com o encaixe (`ease-snap`, `dur-slow`). Some sozinho em 5s; erro só some quando a pessoa fecha.
- Anunciado a leitores de tela com `aria-live="polite"`. No máximo 3 empilhados, separados por `space-2`.
- Erro sempre oferece saída: "tente de novo, ou chame no WhatsApp".
