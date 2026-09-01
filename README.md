# 🏛️ Gabriel Silva Evangelista — Portfólio Profissional

Portfólio interativo de **Gabriel Silva Evangelista**: Soldado do Exército Brasileiro (DEC), especialista em Gestão de Pessoas, Inteligência Artificial, Otimização de Processos e Inovação Pública.

---

## 🚀 Como subir este projeto no GitHub

### Passo 1: Inicializar o repositório localmente
Caso tenha baixado o projeto em ZIP ou clonado:
```bash
git init
git add .
git commit -m "feat: portfolio de Gabriel Silva Evangelista com controle de visitantes e Supabase"
```

### Passo 2: Criar o repositório no GitHub
1. Acesse [github.com/new](https://github.com/new)
2. Defina o nome do repositório (ex: `portfolio-gabriel` ou `gabriel-evangelista`)
3. Escolha se será Público ou Privado e clique em **Create repository**

### Passo 3: Conectar e enviar para o GitHub
Substitua `SEU_USUARIO` e `NOME_DO_REPO` pelos seus dados:
```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
git push -u origin main
```

---

## ⚡ Como Hospedar Gratuitamente na Vercel

O projeto já inclui o arquivo de configuração `vercel.json` pronto com roteamento SPA e otimização de cache.

### Opção 1: Pela Interface Web da Vercel (Recomendado)
1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
2. Clique em **"Add New..."** > **"Project"**.
3. Localize e selecione o repositório do seu portfólio no GitHub e clique em **"Import"**.
4. A Vercel detectará automaticamente as configurações:
   - **Framework Preset**: `Vite`
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
5. *(Opcional)* Em **Environment Variables**, adicione suas credenciais do Supabase caso queira:
   - `VITE_SUPABASE_URL` = `https://seu-projeto.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `sua-chave-anonima-aqui`
6. Clique em **"Deploy"**. Em menos de 1 minuto, seu portfólio estará online com link seguro `https://seu-nome.vercel.app` e SSL gratuito!

### Opção 2: Pela Linha de Comando (Vercel CLI)
```bash
# Instale a CLI da Vercel globalmente
npm i -g vercel

# Execute o deploy
vercel

# Para deploy em produção
vercel --prod
```

---

## 🛠️ Tecnologias Utilizadas

- **React 19** + **TypeScript**
- **Vite 6** (Build rápido e otimizado)
- **Tailwind CSS v4** (Design responsivo e paleta militar/tecnológica refinada)
- **Lucide Icons** (Iconografia semântica)
- **Supabase** (Persistência em banco de dados na nuvem para visitantes)
- **Canvas Confetti** (Feedback interativo de envio de formulários)

---

## 🛡️ Painel Administrativo de Visitantes

O portfólio conta com controle de acesso para visitantes com sincronização no Supabase:
- **Acesso ao painel**: Ícone de escudo no canto inferior direito da tela ou atalho no rodapé.
- **PIN de Acesso Padrão**: `1234` ou `gabriel`
- **Funcionalidades**:
  - Tabela de leads/visitantes com nome, e-mail, cargo, empresa e motivo.
  - Links diretos para WhatsApp e E-mail.
  - Exportação de dados para Excel/CSV.
  - Teste de conexão e sincronização com banco de dados Supabase em tempo real.

---

## 💻 Como Rodar Localmente

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Gerar a versão de produção
npm run build
```
