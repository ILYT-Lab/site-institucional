import type { APIRoute } from 'astro';

// Na homologação (PUBLIC_NOINDEX=true) o Google não indexa nada.
export const GET: APIRoute = ({ site }) => {
  const block = import.meta.env.PUBLIC_NOINDEX === 'true';
  const body = block
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
