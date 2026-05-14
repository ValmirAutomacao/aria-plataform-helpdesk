# ARIA — Autonomous Response & Intelligence Agent

Plataforma SaaS multi-tenant para automação inteligente de atendimento via WhatsApp, com IA, RAG híbrido, transbordo humano controlado, observabilidade operacional e gestão dinâmica de base de conhecimento.

> Status: projeto em fase de especificação/implementação inicial com base no PRD v2.0.

---

## Visão Geral

O **ARIA** foi desenhado para substituir fluxos orquestrados em ferramentas como n8n por uma arquitetura própria, escalável e orientada a produto, combinando:

- **Front-end profissional** em Next.js.
- **Back-end assíncrono** em FastAPI.
- **Banco de dados multi-tenant** com Supabase/PostgreSQL.
- **RAG híbrido** com pgvector.
- **Integração WhatsApp** via Uazapi.
- **Helpdesk com transbordo humano** e controle de estado da IA.
- **Gestão de conhecimento auto-evolutiva** para atualização contínua da inteligência do agente.

O objetivo é entregar uma plataforma robusta para empresas que precisam automatizar conversas, monitorar a operação em tempo real e permitir intervenção humana quando necessário.

---

## Principais Recursos

### Atendimento Inteligente via WhatsApp

- Automação de conversas com IA.
- Integração bidirecional via webhooks da Uazapi.
- Detecção de baixa confiança no RAG.
- Escalada automática para atendimento humano.
- Pausa e retomada da IA por lead/conversa.

### Handoff Humano Cirúrgico

- Criação automática de tickets quando a IA não consegue resolver.
- Protocolo `fromMe` para detectar intervenção humana.
- Modo pausado para impedir respostas duplicadas da IA.
- Retomada manual da automação pelo painel ou comando.

### Helpdesk Multiatendente

- Múltiplas filas/departamentos.
- Status de tickets: `Aguardando IA`, `Aguardando Atendente`, `Em Atendimento`, `Resolvido`.
- Atribuição de atendentes.
- Notificações assíncronas para leads e supervisores.

### Base de Conhecimento com RAG

- Upload de PDFs, DOCX, TXT e URLs.
- Chunking e geração de embeddings em background.
- Versionamento e reindexação parcial de documentos.
- Curadoria baseada em tickets resolvidos por humanos.
- Armazenamento vetorial com Supabase + pgvector.

### Dashboard Operacional

- Conversas ativas em tempo real.
- Live feed de interações.
- Indicadores de confiança do RAG.
- Métricas de SLA, resolução autônoma e performance da equipe.

### Analytics e Relatórios

- Mapa de dores recorrentes.
- Score de saúde do cliente.
- Exportação de dados em CSV/PDF.
- Monitoramento de uso e performance operacional.

---

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| Front-end | Next.js, React, Tailwind CSS, shadcn/ui |
| Back-end | Python 3.12+, FastAPI |
| Banco de dados | Supabase PostgreSQL |
| Vetores/RAG | pgvector |
| Autenticação | Supabase Auth |
| Mensageria/cache | Redis |
| WhatsApp | Uazapi |
| IA/Agentes | LangGraph, LLMs, OCR com modelo multimodal |
| Hospedagem Front-end | Vercel |
| Hospedagem Back-end | Hostinger VPS + Easypanel + Docker |

---

## Arquitetura

```txt
Usuário/Cliente WhatsApp
        │
        ▼
      Uazapi
        │ Webhooks
        ▼
 FastAPI Backend ───── Redis / Workers
        │                  │
        │                  ▼
        │          Processamento IA/RAG/OCR
        │
        ▼
 Supabase PostgreSQL + pgvector
        │
        ▼
 Next.js Dashboard / Helpdesk / Admin
```

A arquitetura é desacoplada para evitar limitações típicas de ambientes serverless em tarefas longas de IA, ingestão documental e processamento assíncrono.

- O **front-end** roda na Vercel.
- O **back-end**, workers e Redis rodam em VPS via Docker/Easypanel.
- O **Supabase** centraliza autenticação, banco relacional, storage e vetores.

---

## Segurança e Multi-tenancy

O ARIA foi projetado para isolar dados entre empresas e reduzir riscos comuns em aplicações SaaS.

### Autenticação

- Supabase Auth com JWT.
- Tokens preferencialmente em cookies `HttpOnly` ou sessão segura no back-end.
- Evita armazenamento sensível em `localStorage`.

### Isolamento de Dados

- Todas as tabelas multi-tenant devem possuir `tenant_id`.
- Uso obrigatório de **Row Level Security (RLS)** no PostgreSQL.
- Políticas impedem vazamento ou cruzamento de dados entre tenants.

### Validação de API

- Rotas FastAPI protegidas por schemas Pydantic.
- Validação rígida de payloads.
- Redução de risco de injeção e payloads maliciosos.

### RBAC

Papéis previstos:

- **Admin**: acesso total, faturamento, usuários, configurações, base de conhecimento e integrações.
- **Gerente**: dashboards, relatórios, filas, curadoria e gestão operacional.
- **Atendente**: acesso restrito aos tickets e conversas atribuídas.

---

## Módulos do Produto

### 1. Autenticação e Onboarding

- Registro de empresa.
- Criação automática de `tenant_id`.
- Wizard inicial com:
  - Perfil da empresa.
  - Conexão WhatsApp via QR Code.
  - Especialistas/personas.
  - Upload inicial da base de conhecimento.
  - Teste de mensagem.
  - Billing e assinatura.

### 2. Dashboard Operacional

- Cards em tempo real.
- Volume de conversas ativas.
- Tempo médio de resposta.
- Taxa de resolução.
- Live feed via WebSockets.
- Badges de confiança do RAG.

### 3. Painel de Atendimento

- Timeline híbrida: IA, cliente e humano.
- Resumo inteligente da conversa.
- Controle de estado da IA.
- Modo de intervenção humana.
- Visualização de mídia e OCR.

### 4. Gestão de Colaboradores e Equipes

- Convites por e-mail.
- Departamentos e filas.
- Disponibilidade do atendente.
- Reatribuição de tickets.
- Revogação de acesso.

### 5. Base de Conhecimento

- Upload de arquivos e URLs.
- Processamento assíncrono.
- Versionamento por documento.
- Curadoria com feedback loop.

### 6. Developer / Integrações

- API Keys por tenant.
- Webhooks outbound.
- Documentação interativa da API.
- Logs técnicos de LLM e Uazapi.

### 7. Analytics

- Métricas de SLA.
- Performance da IA.
- Performance dos atendentes.
- Mapa de dores recorrentes.
- Relatórios exportáveis.

---

## Estrutura Sugerida do Repositório

```txt
aria/
├── apps/
│   ├── web/                  # Front-end Next.js
│   └── api/                  # Back-end FastAPI
├── packages/
│   ├── ui/                   # Componentes compartilhados
│   ├── config/               # Configurações comuns
│   └── types/                # Tipagens e contratos compartilhados
├── infra/
│   ├── docker/               # Dockerfiles e compose
│   ├── supabase/             # Migrations, RLS e seeds
│   └── easypanel/            # Configurações de deploy VPS
├── docs/
│   ├── prd.md
│   ├── architecture.md
│   └── api.md
├── .env.example
└── README.md
```

Ajuste esta estrutura conforme a organização real do repositório.

---

## Configuração Local

### Pré-requisitos

- Node.js 20+
- Python 3.12+
- Docker e Docker Compose
- Conta Supabase
- Instância Uazapi configurada
- Redis local ou em container

### Variáveis de Ambiente

Crie um arquivo `.env` baseado em `.env.example`.

```env
# App
APP_ENV=development
APP_URL=http://localhost:3000
API_URL=http://localhost:8000

# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_JWT_SECRET=

# Database
DATABASE_URL=

# Redis
REDIS_URL=redis://localhost:6379

# Uazapi
UAZAPI_BASE_URL=
UAZAPI_INSTANCE_ID=
UAZAPI_TOKEN=

# LLM / IA
OPENAI_API_KEY=

# Security
COOKIE_SECRET=
JWT_SECRET=
```

---

## Executando o Projeto

### 1. Subir serviços locais

```bash
docker compose up -d
```

### 2. Instalar dependências do front-end

```bash
cd apps/web
npm install
npm run dev
```

Front-end disponível em:

```txt
http://localhost:3000
```

### 3. Instalar dependências do back-end

```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API disponível em:

```txt
http://localhost:8000
```

Documentação interativa prevista:

```txt
http://localhost:8000/docs
```

---

## Fluxo de Atendimento

```txt
1. Cliente envia mensagem no WhatsApp.
2. Uazapi dispara webhook para o FastAPI.
3. Backend identifica tenant, lead e contexto.
4. IA consulta base RAG e gera resposta.
5. Se confiança for suficiente, responde automaticamente.
6. Se confiança for baixa ou cliente pedir humano, cria ticket.
7. Atendente assume conversa.
8. Protocolo fromMe pausa IA para aquele lead.
9. Atendimento é resolvido ou IA é reativada.
```

---

## Roadmap Inicial

### Fase 0 — Fundação

- Modelagem do banco Supabase.
- Definição das políticas RLS.
- Estrutura inicial do monorepo.
- Configuração de ambiente Docker.

### Fase 1 — MVP Operacional

- Autenticação multi-tenant.
- Integração inicial com Uazapi.
- Webhook inbound/outbound.
- Dashboard básico de conversas.
- Criação e gestão inicial de tickets.

### Fase 2 — Inteligência e RAG

- Upload de documentos.
- Chunking e embeddings em background.
- Busca vetorial com pgvector.
- Score de confiança.
- Escalada automática para humano.

### Fase 3 — Operação Premium

- RBAC completo.
- Múltiplas filas.
- Analytics.
- Curadoria automática.
- Logs técnicos.
- Billing e assinatura.

---

## Estratégia Comercial

O ARIA não é posicionado apenas como um SaaS commodity. O modelo previsto combina:

- **Taxa de setup**: implantação, curadoria da base de conhecimento, treinamento da IA e configuração dos fluxos.
- **Mensalidade recorrente**: uso da plataforma, atendimento automatizado e gestão operacional.
- **Variáveis de uso**: tokens, volume de conversas, transcrição de áudio, OCR e recursos avançados de IA.

---

## Boas Práticas de Desenvolvimento

- Nunca expor tokens sensíveis no front-end.
- Nunca salvar JWT em `localStorage`.
- Toda query multi-tenant deve respeitar `tenant_id`.
- Toda tabela crítica deve ter RLS ativa.
- Toda rota de API deve validar payloads com Pydantic.
- Logs não devem conter dados sensíveis de clientes.
- Workers devem ser usados para ingestão documental e tarefas longas de IA.
- Webhooks devem ser idempotentes sempre que possível.

---

## Contribuição

Este projeto ainda está em estágio inicial. Antes de contribuir:

1. Abra uma issue descrevendo a mudança proposta.
2. Crie uma branch a partir de `main`.
3. Faça commits pequenos e rastreáveis.
4. Abra um pull request com descrição clara.
5. Inclua evidências de teste quando aplicável.

---

## Licença

Definir licença antes de uso comercial ou distribuição pública.

Sugestões comuns:

- `MIT` para projeto aberto e permissivo.
- `Apache-2.0` para maior proteção de patentes.
- Licença proprietária para produto SaaS fechado.

---

## Autor

Projeto ARIA — Autonomous Response & Intelligence Agent.

