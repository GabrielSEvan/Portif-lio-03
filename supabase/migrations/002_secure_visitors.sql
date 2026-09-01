-- Segurança e deduplicação dos visitantes
-- Execute depois de 001_create_visitors.sql.

create unique index if not exists idx_visitors_email_unique on public.visitors(email);
create index if not exists idx_visitors_created_at on public.visitors(created_at desc);

alter table public.visitors enable row level security;

drop policy if exists "Permitir insercao publica de visitantes" on public.visitors;
create policy "Permitir insercao publica de visitantes"
on public.visitors
for insert
to anon, authenticated
with check (true);

-- Não criar SELECT/UPDATE/DELETE públicos: os dados dos visitantes
-- devem permanecer acessíveis somente por um ambiente administrativo seguro.
