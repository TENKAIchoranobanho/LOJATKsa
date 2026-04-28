# 💻 Guia Visual: Como Usar o Terminal (Passo a Passo)

Se você nunca usou Terminal antes, este guia é para você! Vou mostrar **exatamente** o que fazer! 🎯

---

## 🖥️ O que é Terminal?

Terminal é um programa onde você digita **comandos** em vez de clicar com o mouse.

É assim:
```
C:\Users\SeuNome\loja-embalagens>
```

Você digita um comando e pressiona **Enter** ↩️

---

## 📍 PASSO 1: Abrir o Terminal

### Windows 10/11:

**Opção 1 (Mais Fácil):**
1. Pressione `Win + R` (Windows + R juntos)
2. Aparecerá uma caixa
3. Digite: `cmd`
4. Pressione Enter
5. Pronto! Terminal aberto ✅

**Opção 2:**
1. Clique em "Iniciar" (Windows)
2. Digite: `cmd`
3. Clique em "Prompt de Comando"

**Opção 3 (No VS Code):**
1. Abra o VS Code
2. Clique em "Terminal" no menu superior
3. Clique em "New Terminal"

### Mac:

1. Pressione `Cmd + Space`
2. Digite: `terminal`
3. Pressione Enter
4. Pronto! ✅

### Linux:

1. Procure por "Terminal" no menu
2. Abra
3. Pronto! ✅

---

## 📂 PASSO 2: Navegar até a Pasta do Projeto

Quando você abre o Terminal, você está em um lugar do computador. Precisa ir até a pasta `loja-embalagens`.

### Descobrir o Caminho:

**Windows:**
1. Abra o File Explorer
2. Procure pela pasta `loja-embalagens`
3. Clique com botão direito
4. Clique em "Copiar como caminho"
5. Você terá algo como: `C:\Users\SeuNome\Downloads\loja-embalagens`

**Mac/Linux:**
1. Abra o Finder
2. Procure pela pasta `loja-embalagens`
3. Clique com botão direito
4. Clique em "Copiar"
5. Você terá algo como: `/Users/SeuNome/Downloads/loja-embalagens`

### Navegar no Terminal:

No Terminal, digite:
```bash
cd C:\Users\SeuNome\Downloads\loja-embalagens
```

**Depois pressione Enter ↩️**

Deve aparecer algo assim:
```
C:\Users\SeuNome\Downloads\loja-embalagens>
```

✅ Pronto! Você está na pasta certa!

---

## 📝 PASSO 3: Executar os Comandos Git

Agora você vai digitar os comandos **um por um**. Após cada comando, **pressione Enter**.

### Comando 1: Inicializar Git
```bash
git init
```
Pressione Enter ↩️

Deve aparecer:
```
Initialized empty Git repository in C:\Users\SeuNome\Downloads\loja-embalagens\.git
```

✅ Pronto!

---

### Comando 2: Adicionar Todos os Arquivos
```bash
git add .
```
Pressione Enter ↩️

Não aparecerá nada, mas está funcionando ✅

---

### Comando 3: Fazer Commit
```bash
git commit -m "Loja de Embalagens"
```
Pressione Enter ↩️

Deve aparecer algo assim:
```
[main (root-commit) abc1234] Loja de Embalagens
 50 files changed, 5000 insertions(+)
```

✅ Pronto!

---

### Comando 4: Renomear Branch
```bash
git branch -M main
```
Pressione Enter ↩️

Não aparecerá nada, mas está funcionando ✅

---

### Comando 5: Adicionar o Repositório Remoto

**⚠️ IMPORTANTE:** Substitua `SEU_USUARIO` pelo seu username do GitHub!

```bash
git remote add origin https://github.com/SEU_USUARIO/loja-embalagens.git
```

Pressione Enter ↩️

Não aparecerá nada, mas está funcionando ✅

---

### Comando 6: Fazer Push (Enviar para GitHub)
```bash
git push -u origin main
```
Pressione Enter ↩️

Pode aparecer uma caixa pedindo:
- **Username**: seu username do GitHub
- **Password**: seu token (não sua senha!)

Digite e pressione Enter

Deve aparecer:
```
Counting objects: 100% (50/50), done.
Delta compression using up to 8 threads
Compressing objects: 100% (45/45), done.
Writing objects: 100% (50/50), 500 KiB | 100 KiB/s, done.
```

✅ Pronto! Seu projeto foi enviado para GitHub!

---

## 🎯 Resumo Visual dos Comandos

```
┌─────────────────────────────────────────────────────────────┐
│ TERMINAL                                                    │
├─────────────────────────────────────────────────────────────┤
│ C:\Users\SeuNome\Downloads\loja-embalagens>                 │
│ $ git init                                                  │
│ Initialized empty Git repository...                         │
│                                                             │
│ C:\Users\SeuNome\Downloads\loja-embalagens>                 │
│ $ git add .                                                 │
│                                                             │
│ C:\Users\SeuNome\Downloads\loja-embalagens>                 │
│ $ git commit -m "Loja de Embalagens"                        │
│ [main (root-commit) abc1234] Loja de Embalagens             │
│  50 files changed, 5000 insertions(+)                       │
│                                                             │
│ C:\Users\SeuNome\Downloads\loja-embalagens>                 │
│ $ git branch -M main                                        │
│                                                             │
│ C:\Users\SeuNome\Downloads\loja-embalagens>                 │
│ $ git remote add origin https://github.com/SEU_USUARIO/... │
│                                                             │
│ C:\Users\SeuNome\Downloads\loja-embalagens>                 │
│ $ git push -u origin main                                   │
│ Counting objects: 100% (50/50), done...                     │
│ ✅ PRONTO!                                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔑 Como Gerar Token do GitHub

Quando pedir "Password", você precisa de um **Token**, não sua senha!

### 1. Acesse GitHub
- Vá para: https://github.com/settings/tokens

### 2. Clique em "Generate new token"
- Clique em "Generate new token (classic)"

### 3. Preencha:
- **Note**: "Vercel Deploy"
- **Expiration**: "No expiration"

### 4. Marque "repo"
- Isso marca automaticamente todas as permissões necessárias

### 5. Clique em "Generate token"

### 6. Copie o token
- Aparecerá uma longa string de caracteres
- **Copie e guarde em lugar seguro!**
- Ele não aparecerá novamente!

### 7. Use no Terminal
- Quando pedir "Password", **cole o token**
- Pressione Enter

---

## 🛠️ Comandos Úteis do Terminal

| Comando | O que faz |
|---------|-----------|
| `cd pasta` | Entra em uma pasta |
| `cd ..` | Volta para pasta anterior |
| `dir` (Windows) ou `ls` (Mac/Linux) | Lista arquivos |
| `pwd` | Mostra caminho atual |
| `git status` | Mostra status do git |
| `git log` | Mostra histórico de commits |
| `clear` ou `cls` | Limpa a tela |

---

## ⚠️ Erros Comuns e Soluções

### Erro: "git: command not found"
**Problema:** Git não está instalado
**Solução:** Instale Git em https://git-scm.com

### Erro: "fatal: not a git repository"
**Problema:** Você não está na pasta certa
**Solução:** Use `cd` para ir até a pasta `loja-embalagens`

### Erro: "Permission denied (publickey)"
**Problema:** Token inválido
**Solução:** Gere um novo token em https://github.com/settings/tokens

### Erro: "fatal: remote origin already exists"
**Problema:** Você já adicionou o remote
**Solução:** Use `git remote remove origin` e tente novamente

---

## 📱 Exemplo Prático Completo

Vamos supor que você está no Windows e a pasta está em:
`C:\Users\Maria\Downloads\loja-embalagens`

### Passo 1: Abrir Terminal
- Pressione `Win + R`
- Digite `cmd`
- Pressione Enter

### Passo 2: Navegar
```bash
cd C:\Users\Maria\Downloads\loja-embalagens
```
Pressione Enter

### Passo 3: Executar Comandos Git
```bash
git init
git add .
git commit -m "Loja de Embalagens"
git branch -M main
git remote add origin https://github.com/maria123/loja-embalagens.git
git push -u origin main
```

Cada um com Enter depois!

### Passo 4: Pronto!
Seu projeto está no GitHub! ✅

---

## 🎯 Checklist

- [ ] Terminal aberto
- [ ] Navegou até a pasta `loja-embalagens`
- [ ] Executou `git init`
- [ ] Executou `git add .`
- [ ] Executou `git commit -m "..."`
- [ ] Executou `git branch -M main`
- [ ] Executou `git remote add origin ...`
- [ ] Executou `git push -u origin main`
- [ ] Projeto aparece no GitHub
- [ ] Pronto para fazer deploy no Vercel! 🎉

---

## 💡 Dicas

✅ **Copie e Cole:** Você pode copiar os comandos deste guia e colar no Terminal (Ctrl+V)

✅ **Não tenha medo:** Terminal não vai quebrar nada, é seguro!

✅ **Leia as mensagens:** O Terminal sempre diz se algo deu errado

✅ **Pressione Enter:** Sempre pressione Enter após cada comando!

✅ **Paciência:** Alguns comandos demoram alguns segundos

---

## 🆘 Precisa de Ajuda?

Se ficar preso:
1. Leia a mensagem de erro
2. Procure a solução neste guia
3. Tente novamente
4. Se não funcionar, reinicie o Terminal

---

**Parabéns! Você aprendeu a usar o Terminal!** 🎉

Agora você consegue fazer o upload do seu projeto! 🚀

