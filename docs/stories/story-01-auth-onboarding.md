# STORY-1: Autenticação e Onboarding Multi-tenant

## 1. Visão Geral
**Objetivo:** Implementar login/registro via Supabase Auth, fluxo de criação de Tenant (Empresa) e redirecionamento dinâmico para o Dashboard operacional, garantindo a fidelidade visual das variantes A/B do protótipo `ARIA Helpdesk.html`.

## 2. Tarefas (Tasks)

- [x] **Configuração Supabase Auth (Back-end):**
  - Habilitar autenticação com E-mail/Senha no Supabase.
  - Criar trigger no Supabase (`auth.users`) para criar automaticamente uma linha em `public.users` via SQL.
  - Implementar fluxo de sessão segura utilizando cookies (`@supabase/ssr` ou roteador de servidor do Next.js).

- [x] **Interface de Login (Front-end):**
  - Desenvolver página `/login`.
  - Implementar a **Variante A** (layout split-screen com os dados da IA à esquerda e formulário à direita).
  - Implementar a **Variante B** (layout centralizado com o background em gradiente).
  - Incluir formulário integrado com as ações do Supabase.

- [x] **Wizard de Onboarding (Multi-tenant):**
  - Desenvolver fluxo para capturar o nome do novo Workspace (Tenant) se o usuário ainda não tiver um.
  - Inserir na tabela `tenants` e associar o ID retornado ao novo usuário em `public.users`.
  
- [x] **Redirecionamento Inteligente:**
  - Configurar middleware no Next.js (`middleware.ts`) para proteger rotas da aplicação (ex: `/dashboard`, `/inbox`).
  - Usuários não logados tentando acessar áreas internas devem ser redirecionados para `/login`.
  - Usuários logados devem ser redirecionados para o painel principal.

## 3. Critérios de Aceite (Quality Gates)
- [x] Cadastro e login com e-mail/senha funcionam corretamente integrados ao Supabase.
- [x] Cada usuário novo gera corretamente um registro de `tenant_id` atrelado no banco de dados.
- [x] Páginas de login replicam exatamente as fontes, sombras e efeitos de glassmorphism do HTML estático.
- [x] O roteamento e middleware protegem as rotas autenticadas de forma eficiente.
- [x] `npm run lint` e `npm run typecheck` devem passar sem erros.

## 4. Referências
- HTML: `ARIA Helpdesk.html` (referência para layouts de login A e B).
- PRD: `ARIA - PRD v2.0.txt` (SaaS Flow / Módulo de Autenticação).
