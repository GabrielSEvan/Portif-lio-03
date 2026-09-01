-- Banco de dados dos visitantes do portfólio
-- Execute este arquivo no Supabase SQL Editor.

create table if not exists public.visitors (
  id text primary key,
  name text not null,
  email text not null,
  organization text,
  role text,
  reason text not null default 'networking',
  whatsapp text,
  linkedin text,
  notes text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.visitors enable row level security;

-- O site público precisa somente inserir novos cadastros.
-- Não liberamos SELECT/UPDATE/DELETE anon para evitar exposição dos dados dos visitantes.
drop policy if exists "Permitir insercao publica de visitantes" on public.visitors;
create policy "Permitir insercao publica de visitantes"
on public.visitors
for insert
to anon, authenticated
with check (true);

create index if not exists idx_visitors_email on public.visitors(email);
create index if not exists idx_visitors_created_at on public.visitors(created_at desc);

comment on table public.visitors is 'Cadastros dos visitantes do portfólio profissional';
