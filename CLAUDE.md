# Site ILYT

Site institucional da ILYT (software sob medida para PMEs, Belo Horizonte/MG). Astro estático + GSAP/Lenis, servido por Nginx em Docker no Coolify.

## Comandos
- `npm run dev`: servidor de desenvolvimento (http://localhost:4321)
- `npm run build`: gera `dist/` (otimiza imagens; demora ~1 min na primeira vez)
- `npm run icons`: regera os ícones PNG a partir de `public/favicon.svg`
- `docker build -t ilyt-site . && docker run -p 8080:80 ilyt-site`: testa a versão de produção (com compressão). Medir notas aqui, não no `astro preview`, que não comprime.

## Onde fica cada coisa
- `src/config/site.ts`: WhatsApp, e-mail, cidade, CNPJ, redes, IDs de medição. Campo vazio = não aparece.
- `src/content/`: projetos do portfólio e perguntas frequentes (editar aqui, não nos componentes).
- `src/components/sections/`: uma seção da home por arquivo, com o CSS da seção no próprio arquivo.
- `src/components/sections/cenas/`: as 4 cenas animadas de "Especialidades".
- `src/styles/global.css`: tokens do design system, base e peças compartilhadas (botões, eyebrow, sec-head).
- `src/scripts/`: `main.ts` inicia tudo; `motion.ts` (GSAP + Lenis) carrega só no primeiro gesto.
- `demos/`: demos do portfólio (Fluxo, Chave, Ritmo, Verbo, Clique, Movimento) e scripts de mockup em `demos/_shots`.
- `brand/provisorio/`: logo e favicon provisórios (redesenho da logo atual). Trocar pela oficial mantendo os nomes.

## Regras
- **Desempenho é promessa do site (90+ no PageSpeed).** Medir com Lighthouse no celular depois de qualquer mudança visual ou de script. Estado atual: celular 97, desktop 100, demais categorias 100.
- Nenhum script pode ler medidas da página (scrollY, offset*, getBoundingClientRect, getComputedStyle) antes do primeiro desenho. Inicializações ficam no `boot()` (requestIdleCallback) de `main.ts`.
- A animação de entrada da hero é CSS; não trocar por GSAP (atrasaria o LCP).
- Imagens: sempre via `astro:assets` (`<Image>`, `<Picture>` ou `ArtPicture`), nunca `<img>` solto com arquivo original.
- Um H1 por página. Seções com H2; itens com H3.
- Todo botão "Pedir diagnóstico" usa `WhatsAppButton` com `from` (vira o evento `clique_whatsapp` com `cta_local`).
- Medição: Umami sem cookies; GTM só carrega após "Aceitar" no aviso de cookies (aparece sozinho quando `gtmId` é preenchido).
- Homologação: build com `PUBLIC_NOINDEX=true` (noindex + robots bloqueado).

## Texto (voz da marca)
- Primeira pessoa do plural pelo verbo ("entendemos", "conectamos"), nunca "a gente". "Você" (não "te"). Chamada de contato: "Nos conte…" / "Fale com a ILYT". Sem jargão (ROI, SLA, B2B), sem metáfora, sem prometer vendas.
- Exceções aprovadas: "Respondemos em até 24 horas" (hero) e o FAQ de preço/pagamento ficam como estão.
- O site não tem formulário: contato é só WhatsApp.

## Pendências antes de publicar
- Atualizar para Astro 7.3.2+ (corrige falhas de segurança) — exige Node 22.23.4+ na máquina local.
- Fotos reais dos demos Movimento, Verbo e Clique (`demos/imagens.md`) e refazer os mockups (`demos/_shots`).
- E-mail contato@ilyt.com.br funcionando; IDs de GTM/Umami; redes sociais; CNPJ; logo oficial.
- Revisão jurídica da política de privacidade.
