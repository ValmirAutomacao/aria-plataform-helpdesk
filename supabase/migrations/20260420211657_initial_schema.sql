-- Habilita extensão para UUID
create extension if not exists "uuid-ossp";

-- Table: tenants
create table public.tenants (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: users (perfis associados ao auth.users do Supabase)
create table public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    tenant_id uuid references public.tenants(id) on delete cascade not null,
    full_name text,
    role text check (role in ('admin', 'manager', 'agent')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: tickets
create table public.tickets (
    id uuid primary key default uuid_generate_v4(),
    tenant_id uuid references public.tenants(id) on delete cascade not null,
    customer_name text not null,
    customer_phone text,
    subject text,
    status text check (status in ('open', 'in_progress', 'resolved', 'escalated')) default 'open',
    priority text check (priority in ('low', 'medium', 'high')) default 'low',
    channel text check (channel in ('whatsapp', 'email', 'chat', 'instagram')) default 'whatsapp',
    assigned_to uuid references public.users(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: messages
create table public.messages (
    id uuid primary key default uuid_generate_v4(),
    tenant_id uuid references public.tenants(id) on delete cascade not null,
    ticket_id uuid references public.tickets(id) on delete cascade not null,
    sender_type text check (sender_type in ('customer', 'ai', 'human')) not null,
    sender_id uuid references public.users(id) on delete set null,
    content text not null,
    is_internal_note boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) - Multi-tenant Isolation
-- ==============================================================================

alter table public.tenants enable row level security;
alter table public.users enable row level security;
alter table public.tickets enable row level security;
alter table public.messages enable row level security;

-- Helpers: Obter tenant do usuário logado
create or replace function public.get_auth_tenant_id()
returns uuid as $$
  select tenant_id from public.users where id = auth.uid();
$$ language sql stable security definer;

-- Policies: Tenants
create policy "Tenant is viewable by its members" on public.tenants
    for select using (id = public.get_auth_tenant_id());

-- Policies: Users
create policy "Users are viewable by tenant members" on public.users
    for select using (tenant_id = public.get_auth_tenant_id());

create policy "Users can update their own profile" on public.users
    for update using (id = auth.uid());

-- Policies: Tickets
create policy "Tickets are viewable by tenant members" on public.tickets
    for select using (tenant_id = public.get_auth_tenant_id());

create policy "Tickets can be created by tenant members" on public.tickets
    for insert with check (tenant_id = public.get_auth_tenant_id());

create policy "Tickets can be updated by tenant members" on public.tickets
    for update using (tenant_id = public.get_auth_tenant_id());

-- Policies: Messages
create policy "Messages are viewable by tenant members" on public.messages
    for select using (tenant_id = public.get_auth_tenant_id());

create policy "Messages can be created by tenant members" on public.messages
    for insert with check (tenant_id = public.get_auth_tenant_id());
