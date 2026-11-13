A ILYT é uma fábrica de soluções digitais para pequenas e médias empresas. O sistema visual nasce do logo: letras feitas de **peças modulares** com cantos arredondados, separadas por um pequeno **corte**, que parecem montadas uma a uma. Tudo no site segue essa ideia: a interface é construída à vista, peça por peça.

## Princípios

- **Montado à vista.** Elementos entram como peças que encaixam (`ease-snap`, `dur-slow`). A animação mostra a ILYT construindo, não decora.
- **Contraste absoluto.** Preto e branco fazem 95% do trabalho. `amber` (Âmbar Máquina) é a "luz de máquina ligada": aparece só onde existe ação.
- **Peças, não caixas.** Cards e blocos usam `radius-piece` e o relevo `shadow-piece` com moderação. Separar por borda `line` é o padrão.
- **Linguagem simples.** Frases curtas, sem tecniquês. A voz técnica fica nos rótulos em `label` (mono, maiúsculas).

## Conteúdo e tom de voz

- Trate o cliente por **você**. A empresa fala como **a gente** no texto corrido e **ILYT** nos títulos.
- Escreva o resultado antes da tecnologia: "um sistema que organiza seus pedidos", não "desenvolvimento de ERP".
- Títulos curtos (até 8 palavras), sem ponto de exclamação, sem emoji.
- Evite jargão: MVP, stack, escalável, disruptivo, solução robusta.
- CTAs dizem exatamente o que acontece: "Falar no WhatsApp", "Ver portfólio", "Ver demo ao vivo".
- Rótulos de seção em `label`, maiúsculas, com número quando houver sequência real: `COMO TRABALHAMOS / 04 ETAPAS`.

## Cor

- Tema principal: **Preto** (`bg` #0a0a0b). Tema **Branco** para páginas internas e seções de respiro; use os mesmos tokens, nunca cores fixas.
- Texto: `ink` sobre `bg`/`surface`; apoio em `ink-muted`.
- `amber` só em: botão principal, cursores da animação, número das etapas, foco. No máximo um elemento âmbar dominante por tela. Texto sobre âmbar usa `on-amber`.
- Tags e realces suaves: `amber-soft` com texto `ink`.
- `success` e `danger` só em formulários, sempre com texto junto.

## Tipografia

- **Unbounded** (`display`): títulos. Larga e geométrica, conversa com as hastes grossas do logo. Nunca em texto corrido.
- **Onest** (`sans`): todo o texto de leitura e botões.
- **JetBrains Mono** (`mono`): rótulos, cursores, números. A "voz da máquina".
- Escala: `display-xl` só no hero; seções em `h1`; cards em `h3`; texto em `body`/`body-l`.
- Celular: `display-xl` → 44px, `display-l` → 36px, `h1` → 30px.
- Fontes do Google Fonts: `https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700&family=Onest:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap`.

## Espaço, forma e grid

- Grid de 12 colunas, largura máxima de 1200px, margem lateral mínima de `space-4` no celular.
- Entre seções: `space-32` no desktop, `space-16` no celular.
- `space-2` (8px) é o **corte** do logo: use entre peças encaixadas (grupo de tags, blocos da animação).
- Cantos: `radius-md` em botões, `radius-piece` em cards, `radius-pill` só em etiquetas de cursor e status.

## Motion

- Assinatura: **encaixe**. Peça vem deslocada e levemente girada e assenta com `ease-snap` em `dur-slow`.
- Cursores com etiqueta (`label` em `radius-pill`, fundo `amber`) "carregam" peças no hero. Um único momento orquestrado por página. O resto da página usa entradas discretas (`ease-out`, deslocamento de 16px).
- Hover e foco: `dur-fast`. Abrir e fechar: `dur-base`.
- Sempre respeitar `prefers-reduced-motion`: mostrar tudo já montado, sem deslocamentos.
- Conteúdo nunca fica escondido esperando animação: o estado de repouso é o estado final.
- Implementação no site: GSAP + ScrollTrigger e Lenis; nos previews, Web Animations API.

## Logo

- `assets/Logos`: versão branca sobre preto (tema Preto) e preta sobre branco (tema Branco). Use a versão do tema; não recolorir.
- Área de proteção: a altura da haste do T de cada lado. Tamanho mínimo: 72px de largura no digital.
- O logo pode ser animado apenas montando as próprias peças (I, L, Y em duas partes, T em duas partes), nunca deformado.
- Arquivo vetorial SVG oficial ainda pendente; as imagens atuais são JPG em alta resolução.

## Iconografia

- Ícones de traço com 1.5px, cantos arredondados (estilo Lucide), em `ink` ou `ink-muted`. Sem emoji.
- Setas `→` em links de ação.
