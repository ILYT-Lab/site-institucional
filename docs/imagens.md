# Lista de imagens (prévia v2)

Cada imagem aparece no site como um placeholder: um retângulo com um X e uma etiqueta com o código. Gere com o mesmo código e envie em **PNG ou JPG no tamanho indicado**. A conversão para AVIF/WebP é feita na implementação.

**Estilo geral, para tudo combinar:**
- fotos e renders escuros, com luz lateral suave e tons neutros;
- **sem pessoas e sem rostos**;
- nada de texto dentro da imagem;
- nos renders 3D, as peças têm o mesmo formato do logo: barras grossas com cantos arredondados e acabamento fosco, como plástico ou cerâmica.

## Renders 3D da marca

| Código | Onde | Proporção · tamanho | O que mostrar |
|---|---|---|---|
| IMG-01 | Hero (tela cheia) | 16:9 · 2880×1620 | Peças **brancas** do logo flutuando e se encaixando para formar a moldura de uma tela/interface. Uma peça **âmbar** (#FFB020). Fundo preto. Deixe a **metade inferior esquerda livre** para o título |
| IMG-11 | Faixa clara "No que a gente acredita" | 4:5 · 1600×2000 | Peças **pretas** do logo sobre **fundo branco**, numa pilha organizada, uma delas sendo encaixada. Luz de estúdio suave |
| IMG-12 | Fechamento (tela cheia) | 16:9 · 2880×1620 | Close da **última peça, âmbar**, sendo encaixada numa estrutura de peças brancas. Fundo preto. **Lado esquerdo livre** para o texto |
| IMG-01m | Hero no celular | 9:16 · 1440×2560 | Mesma cena do IMG-01, recomposta na vertical: peças no **terço superior**, metade de baixo vazia para o título |
| IMG-12m | Fechamento no celular | 9:16 · 1440×2560 | Mesma cena do IMG-12, na vertical: peça âmbar no **terço superior**, metade de baixo vazia para o texto |

As versões "m" se geram **depois** de escolher a horizontal: anexe a imagem escolhida no Gemini e peça para recompor a mesma cena em 9:16. Assim as duas ficam coerentes.

## Fotos da seção "O que a gente constrói" (3 cards)

**Uma imagem só por card, a mesma no desktop e no celular.** Formato quadrado: no desktop o espaço é um pouco mais largo que alto e corta um pouco em cima e embaixo; no celular é mais alto que largo e corta um pouco dos lados. O quadrado aguenta os dois cortes.

Regras de composição:
- **Centro calmo e escuro:** a tela do produto (mock claro) fica por cima do centro da foto e cobre ~60% dela. O que for interessante na foto fica nas bordas.
- **Margem de segurança:** nada importante nos 15% de cada borda (é onde o corte acontece).
- Tons escuros com luz âmbar, sem pessoas, sem texto legível.

| Código | Card | Proporção · tamanho | O que mostrar |
|---|---|---|---|
| IMG-02 | 01 · Para chegar mais cliente | 1:1 · 2000×2000 | Fachada de um pequeno comércio à noite, vitrine acesa com luz âmbar, rua vazia |
| IMG-05 | 02 · Para a operação parar de depender de você | 1:1 · 2000×2000 | Mesa vista de cima com planilhas impressas, post-its e um caderno de pedidos, tons escuros |
| IMG-04 | 03 · Para acabar com o trabalho repetido | 1:1 · 2000×2000 | Celular sobre um balcão à noite, tela acesa com dezenas de notificações empilhadas |

(IMG-03, IMG-06 e IMG-07 saíram com a copy nova.)

## Projetos (dependem das demos existirem)

| Código | Onde | Proporção · tamanho | O que mostrar |
|---|---|---|---|
| IMG-08 | Projeto destaque, monitor | 16:10 · 2560×1600 | Print da demo de clínica: página de agendamento no desktop |
| IMG-08m | Projeto destaque, celular | 9:19.5 · 1170×2532 | Print da mesma demo no celular |
| IMG-09 | Projeto 2, monitor | 16:10 · 2560×1600 | Print da demo de distribuidora: painel de pedidos |
| IMG-10 | Projeto 3, monitor | 16:10 · 2560×1600 | Print da demo de imobiliária: CRM com resumo da IA |

Esses quatro são capturas de tela das demos. Quando as demos existirem, eu mesmo gero as capturas.

## Compartilhamento e marca

| Código | Onde | Formato | O que mostrar |
|---|---|---|---|
| IMG-13 | Imagem do link no WhatsApp e nas redes | 1200×630 PNG | Recorte do IMG-01 com o logo e a frase "Sua empresa tem peças soltas. A gente encaixa." (eu posso montar a partir do IMG-01) |
| Logo branco | Site | SVG | Pendente |
| Logo preto | Site | SVG | Pendente |
| Favicon | Aba do navegador | SVG ou PNG 512×512 | Pendente |

**Opcional, para mais profundidade no hero:** 3 ou 4 peças do IMG-01 em PNG com fundo transparente, separadas. Com elas eu animo cada peça em camadas diferentes, com parallax.
