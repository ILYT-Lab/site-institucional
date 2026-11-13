// Dados da empresa usados no site inteiro (rodapé, botões, SEO, dados estruturados).
// Campo vazio = não aparece no site.
export const site = {
  name: 'ILYT',
  url: 'https://ilyt.com.br',
  tagline: 'Tecnologia sob medida para o seu negócio.',
  city: 'Belo Horizonte',
  region: 'MG',
  regionName: 'Minas Gerais',
  email: 'contato@ilyt.com.br',
  phoneDisplay: '(31) 98387-1700',
  phoneE164: '+5531983871700',
  whatsapp: '5531983871700',
  whatsappMessage: 'Olá! Vim pelo site da ILYT e quero pedir um diagnóstico gratuito.',
  cnpj: '', // preencher quando o registro sair
  legalResponsible: 'Fabricio Camargo', // responsável pelos dados (LGPD) enquanto não houver CNPJ
  founder: { name: 'Fabricio Camargo', role: 'Fundador da ILYT' },
  social: {
    instagram: '',
    linkedin: '',
  },
  // Medição e anúncios. Vazio = desligado. Com o GTM preenchido, o aviso de cookies passa a aparecer.
  analytics: {
    umamiSrc: '', // ex.: https://analytics.ilyt.com.br/script.js
    umamiWebsiteId: '',
    gtmId: '', // ex.: GTM-XXXXXXX
  },
} as const;

export const whatsappUrl = (message: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
