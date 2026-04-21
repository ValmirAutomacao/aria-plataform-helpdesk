-- Função para tratar o cadastro de um novo usuário via auth.users
create or replace function public.handle_new_user()
returns trigger as $$
declare
  new_tenant_id uuid;
  company_name text;
begin
  -- Coleta o company_name via metadata enviado na inscrição, ou usa um valor padrão.
  company_name := coalesce(new.raw_user_meta_data->>'company_name', 'Meu Workspace');

  -- 1. Cria o Tenant (Empresa) para o novo usuário
  insert into public.tenants (name)
  values (company_name)
  returning id into new_tenant_id;

  -- 2. Cria o Perfil Público em public.users associando ao Auth ID e Tenant ID
  insert into public.users (id, tenant_id, full_name, role)
  values (
    new.id,
    new_tenant_id,
    new.raw_user_meta_data->>'full_name',
    'admin' -- O primeiro usuário a criar o tenant é o Admin
  );

  return new;
end;
$$ language plpgsql security definer;

-- Remove o trigger se ele já existir (idempotência)
drop trigger if exists on_auth_user_created on auth.users;

-- Cria a trigger disparada toda vez que uma linha for inserida em auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
