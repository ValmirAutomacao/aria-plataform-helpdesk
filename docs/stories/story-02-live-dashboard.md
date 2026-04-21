# STORY-2: Operação ao Vivo - Dashboard e Inbox IA

## 1. Visão Geral
**Objetivo:** Implementar o Live Feed de conversas com WebSockets do Supabase, construir a interface de chat com Chain of Thought (CoT) visível e configurar o Context Panel lateral com dados VIP do cliente conforme o HTML.

## 2. Tarefas (Tasks)

- [x] **Configuração de WebSockets (Supabase Realtime):**
  - Implementar hook ou camada de comunicação (`useRealtime`) para escutar inserts nas tabelas `tickets` e `messages`.
  - Garantir atualização em tempo real sem recarregamento da página.

- [x] **Interface do Inbox (Listagem de Tickets):**
  - Desenvolver o layout da caixa de entrada principal com base no HTML estático (`ARIA Helpdesk.html`).
  - Renderizar tags de status (Resolvido, Pendente), SLA e indicador "AI" de maneira dinâmica.

- [x] **Janela de Chat & Chain of Thought (CoT):**
  - Construir a janela de conversa simulando a troca de mensagens humano-IA-cliente.
  - Criar o componente de "Pensamento da IA" (CoT) em estado de acordeão ou expansível, fiel ao design original.

- [x] **Context Panel (Dados do Cliente):**
  - Implementar a barra lateral da direita que exibe informações do ticket.
  - Mostrar os perfis VIP e histórico do cliente extraídos do protótipo.

## 3. Critérios de Aceite (Quality Gates)
- [x] Novas mensagens injetadas no banco de dados devem aparecer instantaneamente no Inbox.
- [x] A área central de Chat reproduz fielmente as caixas de fala com o CoT.
- [x] O Context Panel à direita está fixo e espelha o HTML estático perfeitamente.
- [x] O projeto passa na verificação de tipagem (`npm run typecheck`) e lint (`npm run lint`).

## 4. Referências
- HTML: `ARIA Helpdesk.html` (referência para o layout Inbox, Chat e Context Panel).
- Supabase: Supabase Realtime Channels (WebSockets).
