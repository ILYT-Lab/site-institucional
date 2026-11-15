# ILYT · site institucional

Astro (estático) + GSAP/Lenis, publicado como container Nginx no Coolify.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera dist/
docker build -t ilyt-site . && docker run -p 8080:80 ilyt-site   # versão de produção
```

Configuração da empresa (WhatsApp, e-mail, CNPJ, medição): `src/config/site.ts`.
Regras do projeto: `CLAUDE.md`.

## Publicação (Coolify)
- Tipo: Dockerfile, porta 80.
- Antes do lançamento: variável de build `PUBLIC_NOINDEX=true` (não indexa no Google) e senha no Coolify. No lançamento, `false` e sem senha.
- Produção: `PUBLIC_NOINDEX=false`.
