# 🖥️ Guia GitHub Desktop - A Forma Mais Fácil!

Se você quer fazer alterações **SEM usar Terminal**, o GitHub Desktop é perfeito! 🎯

---

## 📥 PASSO 1: Instalar GitHub Desktop

### Windows ou Mac:

1. Acesse: https://desktop.github.com
2. Clique em "Download"
3. Execute o instalador
4. Siga as instruções
5. Pronto! ✅

---

## 🔐 PASSO 2: Fazer Login

1. Abra o GitHub Desktop
2. Clique em "File" → "Options" (Windows) ou "GitHub Desktop" → "Preferences" (Mac)
3. Clique em "Accounts"
4. Clique em "Sign in with your browser"
5. Autorize o GitHub Desktop
6. Pronto! ✅

---

## 📂 PASSO 3: Clonar o Repositório

### O que é clonar?
Clonar significa **baixar uma cópia** do seu repositório do GitHub para o seu computador.

### Como fazer:

1. Abra o GitHub Desktop
2. Clique em "File" → "Clone repository"
3. Procure por "LOJATK" (seu repositório)
4. Escolha onde salvar (ex: Downloads)
5. Clique em "Clone"
6. Aguarde terminar ✅

Agora você tem uma cópia do projeto no seu computador!

---

## ✏️ PASSO 4: Fazer Alterações

Agora você pode editar os arquivos normalmente:

1. Abra o VS Code
2. Abra a pasta do projeto (que você clonou)
3. Faça as alterações que quiser
4. Salve os arquivos (Ctrl+S)

**Exemplo:** Quer mudar a cor do botão? Edite o arquivo CSS e salve!

---

## 📤 PASSO 5: Enviar as Alterações para GitHub

Depois de fazer alterações, você precisa enviar para o GitHub. É bem fácil!

### Passo 5.1: Abra GitHub Desktop

Você verá algo assim:

```
┌─────────────────────────────────────┐
│ Changes (3)                         │
├─────────────────────────────────────┤
│ ✓ src/index.css                     │
│ ✓ src/components/Navbar.jsx         │
│ ✓ package.json                      │
└─────────────────────────────────────┘
```

Isso significa que 3 arquivos foram alterados!

### Passo 5.2: Escrever uma Mensagem

Na caixa "Summary", escreva o que você mudou:

```
Exemplo: "Alterar cor do botão para verde"
```

### Passo 5.3: Clique em "Commit to main"

Isso **salva** suas alterações localmente.

### Passo 5.4: Clique em "Push origin"

Isso **envia** suas alterações para o GitHub! 🚀

---

## 🔄 Vercel Atualiza Automaticamente!

Depois que você faz "Push origin":

1. O GitHub recebe suas alterações
2. O Vercel **detecta automaticamente** que houve mudanças
3. O Vercel faz um novo build
4. Seu site atualiza em 1-2 minutos! ✨

Você não precisa fazer nada no Vercel!

---

## 🎯 Resumo Visual

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. Editar arquivos no VS Code                      │
│     ↓                                               │
│  2. GitHub Desktop detecta as mudanças              │
│     ↓                                               │
│  3. Escrever mensagem (ex: "Alterar cor")           │
│     ↓                                               │
│  4. Clique em "Commit to main"                      │
│     ↓                                               │
│  5. Clique em "Push origin"                         │
│     ↓                                               │
│  6. GitHub recebe as alterações                     │
│     ↓                                               │
│  7. Vercel faz novo build automaticamente           │
│     ↓                                               │
│  8. Seu site atualiza! 🎉                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 💡 Dicas Importantes

✅ **Sempre salve os arquivos** antes de fazer commit (Ctrl+S)

✅ **Escreva mensagens descritivas** (ex: "Adicionar logo" em vez de "mudança")

✅ **Faça commits regularmente** (não espere fazer 100 mudanças de uma vez)

✅ **Verifique o GitHub Desktop** para ver o que foi alterado

✅ **Aguarde o Vercel terminar** antes de testar o site (1-2 minutos)

---

## 🖼️ Exemplo Prático Passo a Passo

Vamos supor que você quer **mudar a cor do botão de verde para azul**:

### 1. Abra o VS Code
- Abra a pasta do projeto

### 2. Edite o arquivo
- Abra `src/index.css` ou `tailwind.config.js`
- Procure por `#16a34a` (verde)
- Mude para `#0284c7` (azul)
- Salve (Ctrl+S)

### 3. Abra GitHub Desktop
- Você verá que o arquivo foi alterado
- Na caixa "Summary", escreva: "Mudar cor do botão para azul"

### 4. Clique em "Commit to main"
- Suas alterações são salvas localmente

### 5. Clique em "Push origin"
- Suas alterações vão para o GitHub

### 6. Aguarde 1-2 minutos
- O Vercel faz o build
- Seu site atualiza automaticamente!

### 7. Pronto! 🎉
- Abra seu site e veja a cor azul!

---

## 🔍 Ver o Histórico de Alterações

Se quiser ver tudo que você alterou:

1. Abra GitHub Desktop
2. Clique em "History"
3. Você verá todas as mudanças que fez
4. Clique em qualquer uma para ver os detalhes

---

## 🆘 Se Algo Deu Errado

### Problema: "Failed to push"
**Solução:** Clique em "Pull origin" primeiro, depois "Push origin"

### Problema: Não vejo as alterações no site
**Solução:** Aguarde 2-3 minutos (Vercel está fazendo build)

### Problema: Arquivo não aparece em "Changes"
**Solução:** Verifique se você salvou o arquivo (Ctrl+S)

---

## 📋 Checklist

- [ ] GitHub Desktop instalado
- [ ] Logado com sua conta GitHub
- [ ] Repositório clonado
- [ ] Arquivos editados no VS Code
- [ ] Alterações aparecem no GitHub Desktop
- [ ] Mensagem escrita
- [ ] "Commit to main" clicado
- [ ] "Push origin" clicado
- [ ] Vercel fez o build
- [ ] Site atualizado! ✅

---

## 🎓 Próximas Vezes

Depois da primeira vez, é ainda mais fácil:

1. Edite os arquivos no VS Code
2. Abra GitHub Desktop
3. Escreva a mensagem
4. Clique "Commit to main"
5. Clique "Push origin"
6. Pronto! 🚀

Isso leva menos de 1 minuto!

---

**Parabéns! Agora você sabe como fazer alterações facilmente!** 🎉

Qualquer dúvida, me chama! 😊
