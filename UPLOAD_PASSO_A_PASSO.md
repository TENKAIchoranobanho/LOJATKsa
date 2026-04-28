# 📤 Guia Completo: Upload para GitHub e Vercel (Passo a Passo)

Aqui você aprenderá exatamente como fazer o upload do seu projeto e colocá-lo online!

---

## 🎯 Objetivo Final

Seu site estará em: `https://seu-projeto.vercel.app` 🌐

---

## ⚙️ PASSO 1: Preparar o Computador

### 1.1 Instalar Git (se não tiver)

**Windows:**
- Acesse: https://git-scm.com/download/win
- Baixe o instalador
- Execute e clique "Next" em tudo
- Reinicie o computador

**Mac:**
- Abra o Terminal
- Digite: `xcode-select --install`
- Pressione Enter

**Linux:**
- Abra o Terminal
- Digite: `sudo apt-get install git`
- Pressione Enter

### 1.2 Verificar se Git está instalado
```bash
git --version
```
Deve aparecer algo como: `git version 2.x.x`

---

## 📝 PASSO 2: Criar Conta no GitHub

### 2.1 Acesse o GitHub
- Abra: https://github.com
- Clique em **"Sign up"** (canto superior direito)

### 2.2 Preencha os dados
- **Username**: seu nome de usuário (ex: seu-nome-123)
- **Email**: seu email
- **Password**: sua senha
- Clique em **"Create account"**

### 2.3 Verifique o email
- Abra seu email
- Clique no link que GitHub enviou
- Pronto! Conta criada ✅

---

## 🚀 PASSO 3: Upload do Projeto para GitHub

### 3.1 Abra o Terminal/Prompt de Comando

**Windows:**
- Pressione `Win + R`
- Digite: `cmd`
- Pressione Enter

**Mac/Linux:**
- Procure por "Terminal" no menu
- Abra

### 3.2 Navegue até a pasta do projeto
```bash
cd caminho/para/loja-embalagens
```

**Exemplo Windows:**
```bash
cd C:\Users\SeuNome\Downloads\loja-embalagens
```

**Exemplo Mac/Linux:**
```bash
cd ~/Downloads/loja-embalagens
```

### 3.3 Crie um repositório no GitHub

Acesse: https://github.com/new

Preencha:
- **Repository name**: `loja-embalagens`
- **Description**: "Loja de Embalagens - E-commerce"
- Deixe como **Public** (para Vercel conseguir acessar)
- **NÃO** clique em "Add a README file"
- Clique em **"Create repository"**

### 3.4 Copie a URL do repositório

Após criar, você verá uma página com a URL. Copie algo como:
```
https://github.com/SEU_USUARIO/loja-embalagens.git
```

### 3.5 Execute os comandos no Terminal

No terminal, dentro da pasta `loja-embalagens`, execute:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Loja de Embalagens - Primeira versão"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/SEU_USUARIO/loja-embalagens.git
```

**⚠️ IMPORTANTE:** Substitua `SEU_USUARIO` pelo seu username do GitHub!

```bash
git push -u origin main
```

### 3.6 Digite suas credenciais

Quando pedir:
- **Username**: seu username do GitHub
- **Password**: seu token de acesso (veja abaixo)

#### Como gerar um Token de Acesso:

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"**
3. Clique em **"Generate new token (classic)"**
4. Preencha:
   - **Note**: "Vercel Deploy"
   - **Expiration**: "No expiration"
5. Marque a opção **"repo"** (seleciona automaticamente tudo)
6. Clique em **"Generate token"**
7. **Copie o token** (ele não aparecerá novamente!)
8. Use este token como senha no git push

---

## ✅ PASSO 4: Verificar Upload no GitHub

1. Acesse: https://github.com/SEU_USUARIO/loja-embalagens
2. Você deve ver todos os arquivos do projeto
3. Pronto! ✅

---

## 🌐 PASSO 5: Deploy no Vercel

### 5.1 Crie uma conta no Vercel

- Acesse: https://vercel.com
- Clique em **"Sign Up"**
- Clique em **"Continue with GitHub"**
- Autorize o Vercel a acessar sua conta GitHub

### 5.2 Importe o projeto

- Na página do Vercel, clique em **"New Project"**
- Procure por "loja-embalagens"
- Clique em **"Import"**

### 5.3 Configure o projeto

A página deve mostrar:
- **Framework Preset**: React (detectado automaticamente)
- **Build Command**: `npm run build` (padrão)
- **Output Directory**: `dist` (padrão)
- **Install Command**: `npm install` (padrão)

**Clique em "Deploy"** e aguarde! ⏳

### 5.4 Seu site está online! 🎉

Após alguns minutos, você verá uma mensagem de sucesso com o link:
```
https://seu-projeto.vercel.app
```

**Copie este link e compartilhe!** 🌐

---

## 🔄 PASSO 6: Como Atualizar o Site

Depois que o site estiver online, toda vez que você fizer mudanças:

### 6.1 Faça as mudanças no código

Edite os arquivos que quiser no VS Code

### 6.2 Envie para GitHub

No terminal, dentro da pasta do projeto:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

### 6.3 Vercel atualiza automaticamente

Em 1-2 minutos, seu site estará atualizado! ✨

---

## 🛠️ Troubleshooting - Erros Comuns

### Erro: "fatal: not a git repository"

**Solução:**
```bash
git init
```

### Erro: "Permission denied (publickey)"

**Solução:**
- Gere um novo token em: https://github.com/settings/tokens
- Use o token como senha

### Erro: "Build failed" no Vercel

**Solução:**
1. Vá para o repositório GitHub
2. Verifique se todos os arquivos estão lá
3. Clique em "Redeploy" no Vercel
4. Aguarde

### Site não carrega ou mostra erro 404

**Solução:**
- Verifique se o `vite.config.js` está correto
- Verifique se `npm run build` funciona localmente

---

## 📱 Testar o Site

Após o deploy:

1. **Abra o link** em seu navegador
2. **Teste em celular** também (compartilhe o link)
3. **Teste as funcionalidades:**
   - Login/Cadastro
   - Adicionar ao carrinho
   - Filtros
   - Admin (estoque)

---

## 🎯 Checklist Final

- [ ] Git instalado
- [ ] Conta GitHub criada
- [ ] Repositório criado no GitHub
- [ ] Projeto enviado para GitHub
- [ ] Conta Vercel criada
- [ ] Projeto importado no Vercel
- [ ] Deploy realizado com sucesso
- [ ] Site acessível em vercel.app
- [ ] Funcionalidades testadas

---

## 💡 Dicas Importantes

✅ **Faça commits regularmente** com mensagens descritivas  
✅ **Sempre teste localmente** antes de fazer push  
✅ **Guarde seu token** em lugar seguro  
✅ **Não compartilhe** seu token com ninguém  
✅ **Monitore** o desempenho do site  

---

## 🆘 Precisa de Ajuda?

Se tiver dúvidas:
- Vercel Support: https://vercel.com/support
- GitHub Help: https://github.com/support
- Stack Overflow: https://stackoverflow.com

---

**Parabéns! Seu site está online!** 🎉🚀

Aproveite e compartilhe com o mundo! 🌍

