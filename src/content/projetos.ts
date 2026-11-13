// Projetos da seção Portfólio. Para adicionar um: salve a imagem (16:10, de preferência 3200×2000) em
// src/assets/projetos e inclua um item aqui. "url" é opcional: com ela, o modal mostra "Ver online".
import type { ImageMetadata } from 'astro';
import fluxo from '../assets/projetos/fluxo.png';
import chave from '../assets/projetos/chave.png';
import ritmo from '../assets/projetos/ritmo.png';
import verbo from '../assets/projetos/verbo.png';
import clique from '../assets/projetos/clique.png';
import movimento from '../assets/projetos/movimento.png';

export type Projeto = { nome: string; tipo: string; descricao: string; imagem: ImageMetadata; url?: string };

export const sistemas: Projeto[] = [
  { nome: 'Fluxo', tipo: 'Sistema de pedidos e entregas', descricao: 'Pedidos, estoque, rotas de entrega e faturamento do dia em um só painel, no computador e no celular.', imagem: fluxo },
  { nome: 'Chave', tipo: 'CRM com atendimento por IA', descricao: 'Funil de clientes para imobiliárias, com IA que responde no WhatsApp, sugere imóveis e agenda visitas com o corretor.', imagem: chave },
  { nome: 'Ritmo', tipo: 'Aplicativo de agendamento', descricao: 'App para estúdios de pilates e yoga: o aluno vê as aulas, reserva em um toque e recebe um lembrete antes de começar.', imagem: ritmo },
];

export const sites: Projeto[] = [
  { nome: 'Verbo', tipo: 'Site institucional', descricao: 'Site para empresa de tradução, com serviços, forma de trabalho e pedido de orçamento com envio de arquivo.', imagem: verbo },
  { nome: 'Clique', tipo: 'Landing page de lançamento', descricao: 'Página de vendas para curso online, com contagem regressiva, módulos, antes e depois, depoimentos e oferta.', imagem: clique },
  { nome: 'Movimento', tipo: 'Site com agendamento', descricao: 'Site para clínica de fisioterapia, com agendamento de avaliação direto na página, tratamentos e depoimentos.', imagem: movimento },
];
