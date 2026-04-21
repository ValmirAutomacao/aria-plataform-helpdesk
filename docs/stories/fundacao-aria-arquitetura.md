# Story: Fundação ARIA: Arquitetura e Design System

## 1. Visão Geral
**Objetivo:** Configurar o esqueleto Next.js, integrar o tema Tailwind baseado no HTML (`ARIA Helpdesk.html`) e definir o esquema de dados inicial no Supabase com isolamento de `tenant_id`.

## 2. Tarefas (Tasks)

- [x] **Configuração Base (Next.js):**
  - Inicializar projeto Next.js (App Router).
  - Configurar e instalar Tailwind CSS.
  - Inicializar e configurar a biblioteca `shadcn/ui` com as fontes adequadas (*Inter*, *Space Grotesk*, *JetBrains Mono*).

- [x] **Design System:**
  - Mapear variáveis de cor (`--bg-0`, `--v-500`, `--ok`, gradientes, etc) do arquivo `ARIA Helpdesk.html`.
  - Configurar essas variáveis no `tailwind.config.js` e `globals.css` (Dark Theme default).
  - Criar estilos utilitários para os efeitos glassmorphism e brilhos (*brand-dot*).

- [x] **App Shell (Layout):**
  - Criar o componente de Layout Global.
  - Implementar o componente `Sidebar` e `Rail`.
  - Implementar a `Topbar` (breadcrumbs, ações).

- [x] **Banco de Dados (Supabase):**
  - Configurar o cliente Supabase.
  - Criar migrações/scripts para tabelas base (ex: `tenants`, `users`, `tickets`).
  - Implementar Row Level Security (RLS) baseada na coluna `tenant_id` para garantir o multi-tenancy.

## 3. Critérios de Aceite (Quality Gates)
- [x] Interface executa e roda sem erros (`npm run dev`).
- [x] Visualização base corresponde à paleta de cores e tipografia exigida pelo HTML original.
- [x] Regras de linting e typecheck passam com sucesso (`npm run lint`, `npm run typecheck`).
- [x] Supabase configurado (com RLS aplicada a tabelas de testes, caso existam).

## 4. Referências
- `ARIA - PRD v2.0.txt`
- `ARIA Helpdesk.html`
