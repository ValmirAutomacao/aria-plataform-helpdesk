-- Migration para adicionar a role 'super_admin' e criar bypass de RLS genérico

begin;

  -- 1. Atualizar a constraint da role na tabela users
  alter table public.users drop constraint if exists users_role_check;
  alter table public.users add constraint users_role_check check (role in ('super_admin', 'admin', 'manager', 'agent'));

  -- 2. Criar função de verificação segura (Security Definer para evitar recursão infinita no RLS)
  create or replace function public.is_super_admin()
  returns boolean as $$
  begin
    return exists (
      select 1 from public.users
      where id = auth.uid() and role = 'super_admin'
    );
  end;
  $$ language plpgsql security definer set search_path = public;

  -- 3. Adicionar políticas de bypass total para super admins
  -- Tenants
  create policy "Super Admins bypass RLS on tenants" on public.tenants for all using (public.is_super_admin());
  
  -- Users
  create policy "Super Admins bypass RLS on users" on public.users for all using (public.is_super_admin());
  
  -- Tickets
  create policy "Super Admins bypass RLS on tickets" on public.tickets for all using (public.is_super_admin());
  
  -- Messages
  create policy "Super Admins bypass RLS on messages" on public.messages for all using (public.is_super_admin());

  -- 4. Elevar o usuário especificado
  update public.users
  set role = 'super_admin'
  from auth.users
  where public.users.id = auth.users.id
    and auth.users.email = 'valmirmoreirajunior@gmail.com';

commit;
