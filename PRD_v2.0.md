# ARIA - Autonomous Response & Intelligence Agent
## Product Requirements Document • v2.0

**Versão:** v2.0 — MVP
**Status:** 🟡 Em Definição
**Segmento:** B2B — Multi-setor
**Stack Core:** Python / FastAPI (Backend), Next.js (Frontend), Supabase (Banco de Dados), Uazapi (Mensageria)

---

## 1. Visão Geral do Produto

### 1.1 O Problema que Resolvemos
Empresas que usam WhatsApp como canal principal de suporte enfrentam um paradoxo crescente: o volume de atendimentos escala mais rápido do que a capacidade humana, mas as soluções de automação no mercado são caixas pretas. O gestor não sabe o que a IA diz, não enxerga gargalos e não tem controle real da operação. 
O ARIA resolve o gap entre plataformas no-code (sem observabilidade) e plataformas enterprise (caras, não adaptadas ao WhatsApp brasileiro).

### 1.2 O Produto: ARIA
Plataforma de helpdesk inteligente via WhatsApp, construída com stack moderna, oferecendo as seguintes camadas:
- **Camada Operacional:** IA responde via WhatsApp (integrada via Uazapi) com roteamento para especialistas, RAG híbrido, e estado de transbordo humano.
- **Camada de Observabilidade:** Dashboard ao vivo, score de confiança, controle humano cirúrgico.
- **Camada de Inteligência:** Clustering de dores recorrentes, base de conhecimento auto-atualizada.

---

## 2. Pilares de Segurança e Multi-tenancy

Para garantir o isolamento total de dados entre os clientes (empresas) do SaaS:
- **Autenticação:** Utilização do Supabase Auth com JWT. No Next.js, os tokens serão armazenados de forma segura (instâncias de memória ou cookies HttpOnly), rejeitando o uso de `localStorage` para mitigar ataques XSS.
- **Isolamento de Dados (RLS):** Implementação de Row Level Security (RLS) no Supabase. Cada tabela possuirá a coluna `tenant_id`, blindando o acesso cruzado de dados entre diferentes clientes.
- **Comunicação Segura:** Rotas do FastAPI estritamente protegidas por validação de token e Pydantic.
- **Controle de Acesso (RBAC):** Hierarquia clara (Admin flexível para infra e base de conhecimento, Gerentes para acompanhamento e Atendentes estritamente para tickets e atendimentos).

---

## 3. Arquitetura Técnica Recomendada

### 3.1 Backend
- **Framework:** Python 3.12+ / FastAPI (API principal, WebSockets, Webhooks da Uazapi).
- **Inteligência:** LangChain / LangGraph (orquestração), OpenAI GPT-4o / Whisper (LLM e Transcrição), modelos OCR (GPT-4o-mini).
- **Mensageria Assíncrona:** Celery + Redis (filas, debounce, rate limiting).
- **RAG e Vector Store:** Supabase pgvector (Busca Semântica + full-text BM25) com Cohere Rerank.

### 3.2 Frontend (Portal)
- **Framework:** Next.js (App Router, Server Actions, SSR para performance) com TypeScript.
- **Design System:** shadcn/ui + Tailwind CSS.
- **Gerenciamento de Estado:** TanStack Query + Zustand; Websocket nativo para feeds ao vivo.

### 3.3 Integração e Infraestrutura
- **WhatsApp:** Integração via Webhooks através da **Uazapi**.
- **Banco de Dados / Auth / Storage:** Supabase.
- **Hospedagem / Orquestração:** Serviço `portal` gerenciado e publicado via **Easypanel** em **VPS Hostinger**, garantindo maior flexibilidade versus limitações serverless. (Ver Análise de Hospedagem).

---

## 4. Fluxo de Atendimento e Motor IA

O sistema opera em três estados lógicos: **Automático**, **Pausado (Intervenção Humana)** e **Híbrido**.

### 4.1 Regra de Transbordo (Handoff) e Protocolo "fromMe"
- **Gatilho de Ticket:** A IA cria um ticket com status *Aberto* quando o score do RAG é muito baixo (não há respostas para a dúvida) ou o usuário solicita conscientemente "falar com humano". Um webhook notifica o supervisor.
- **Protocolo "fromMe":** Caso o atendente perceba a necessidade de intervir diretamente e enviar uma mensagem manual pelo painel (com a sinalização `fromMe: true`), a IA entra *automaticamente* no estado de Pausa para aquele contato, evitando respostas embaralhadas.
- **Retomada:** Um botão no painel (ou comando oculto `/ia_on`) reativará o agente autônomo na mesma conversa.

### 4.2 Processamento de Áudios e Imagens (OCR)
- **Áudios:** Transcritos usando a API Whisper (OpenAI) e em seguida processados pelos agentes.
- **Análise Multimodal das Imagens:** Imagens interceptadas pela Uazapi passam pelo GPT-4o-mini (excelente custo-benefício). Comprovantes de pagamento e documentos terão seus dados extraídos. Imagens irrelevantes (memes, fotos escuras) disparam um fallback educado pedindo esclarecimentos.

---

## 5. Gestão de Tickets e Multi-atendentes

Diferenciando-se de soluções puramente automatizadas, o sistema constrói uma fila hierárquica e setorial de atendimento:
- **Departamentos:** As empresas (tenants) alocam agentes humanos em filas como Suporte e Financeiro.
- **Status do Ticket:** Os tickets flutuam entre *Aguardando IA*, *Aguardando Atendente*, *Em Atendimento*, e *Resolvido*.
- **Notificações Automáticas:** Usuários/Leads podem ser notificados via e-mail e mensageria informando protocolos de acompanhamento ("Olá, seu suporte foi iniciado. Protocolo: #123").

---

## 6. Dashboard Operacional (Torre de Controle)

O principal diferencial visual provido pelo frontend em Next.js:
- **Live Feed Observável:** Cards mostrando, em tempo real (Websocket), diálogos em andamento, priorizados pela cor baseada na assertividade (confiança) da IA.
- **Modos de Intervenção Humana:** 
  - *Modo Observação* (ver apenas a cadeia de pensamentos - CoT e o andamento), 
  - *Modo Injeção* (inserir uma frase que prossegue com o cliente e devolve à IA em seguida)
  - *Modo Assumir* (gatilho completo do Handoff visual).

---

## 7. Base de Conhecimento e RAG Inteligente

Interface moderna para munir e treinar a "memória da IA":
- **Envio:** Upload simples de PDF, Docx, Txt e captura por URLs.
- **Versioning e Edição Restrita:** Exclusão e indexação granular de chunks. Se uma política muda, exclui-se apenas um documento na vector store do Supabase (por metadados) sem travar ou reindexar o restante. O job no back-end (Celery) reencoda e recarrega silenciosamente.

---

## 8. Estratégia de Negócios e Monetização

Transição do serviço como commodity/SaaS flexível para um modelo sustentável focado no serviço real agregado ao B2B:
- **Taxa de Setup (Implantação):** Cobrança inicial para curadoria personalizada da base de conhecimento do cliente, setup de fluxos manuais de transbordo e treinamento restrito.
- **Recorrência (Mensalidade):** Valor fixo pela infraestrutura garantida + Variáveis de acordo com altos volumes de token transacionados (pay-as-you-go).

---

## 9. Análise: Hospedagem Frontend (Next.js)

### Vercel (Free / Hobby Plan) vs. VPS Hostinger + Easypanel

O solicitante deseja explorar a hospedagem na Vercel pela praticidade de CI/CD, porém reportou problemas passados de incompatibilidade e limitação de versão do Next.js. Segue a análise:

| Análise Técnica | Vercel (Hobby / Free Plan) | VPS Hostinger + Easypanel (Serviço `portal`) |
|------------------|---------------------------|----------------------------------------------------|
| **Suporte à Versão (Next.js 14 e 15)** | Totalmente otimizada (eles criam o Next.js). **A ressalva é que grandes builds complexas falham se excederem recursos da tier grátis.** | Suporta **qualquer** versão (Node.js rodando em Docker nativo via Dockerfile). |
| **Limitações de Memória e Deploy** | **Limitado a 50MB** de Edge Functions/Serverless e 10 segundos de Timeout de API; muitas vezes acusa "falha de versão" por conta de payloads antigos. | **Ilimitado**, respeitando apenas o hardware real da VPS. Sem timeout serverless arbitrário. |
| **Setup de WebSockets (Live Feed)** | **Serverless não suporta WebSockets contínuos** nativamente, exigindo adaptadores externos (como Pusher) ou polling severo (caro). | **Suporte Nativo a WebSockets**. O backend do Next.js hospedado em VPS mantem uma conexão TCP contínua fluída. |
| **Processos em Background (Docker)** | Não é possível rodar Filas, Celery ou container redis lado-a-lado com a aplicação web. | Tudo estará encapsulado e orquestrado no Easypanel (Redis, Python worker, Base Next.js). |

#### Conclusão Recomendada para o Projeto ARIA
Dado que o projeto é complexo e usa **RAG, Arquitetura Multitenant (Supabase), Filas Assíncronas (Celery) e WebSockets ao Vivo (Live Feed do Chat)**:
**A melhor escolha é hospedar no VPS Hostinger usando Easypanel.**
A Vercel exigirá sacrifícios da arquitetura na versão grátis (ex: WebSockets). Ao usar o Easypanel, definiremos simplesmente um `Dockerfile` para construir o app Next.js usando o `pnpm`, publicando sob o serviço interno chamado `portal`. É flexível, barato, e permitirá total aderência à versão mais recente do Next.js (seja 14 ou 15) sem restrições surpresas da Vercel.

---

## 10. Roadmap Simplificado
- **Fase 1:** Setup da VPS Hostinger + Easypanel (Banco Supabase já externo, deploy backend Python e Next.js no `portal`).
- **Fase 2:** Autenticação (JWT Segura sem localStorage) + Conexão Webhooks da Uazapi.
- **Fase 3:** Motor IA, transbordo `fromMe`, processamento de OCR Imagens e Respostas em fila.
- **Fase 4:** Telas do Dashboard multi-atendente em Next.js (shadcn) conectado por WebSockets no próprio IP da VPS.
- **Fase 5:** Multi-tenancy isolation e RLS aplicado nativo.
