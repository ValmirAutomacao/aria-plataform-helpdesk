-- Ativação do Supabase Realtime para as tabelas principais de operação ao vivo
-- Essas tabelas já possuem RLS rigoroso com políticas de tenant, o que garante 
-- que os canais realtime (authenticated-only) apenas transmitam payloads
-- permitidos para os membros corretos do workspace.

begin;

  -- Se a publicação não existir (pode ser recriada ou atualizada em novas instâncias)
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;

  -- Adicionar tabelas à publicação realtime
  alter publication supabase_realtime add table public.tickets;
  alter publication supabase_realtime add table public.messages;

commit;
