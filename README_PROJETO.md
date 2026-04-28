# 📦 Loja de Embalagens - Projeto Completo

Uma aplicação web moderna e completa de e-commerce para venda de embalagens, desenvolvida com **React**, **Vite** e **Tailwind CSS**.

## 🎯 Características Principais

### ✅ Funcionalidades Implementadas

- **Sistema de Autenticação**: Login e cadastro de usuários com suporte a modo administrador
- **Home Page**: Hero section atrativa com destaques de produtos e categorias
- **Catálogo de Produtos**: 
  - Grid responsivo com 12+ produtos
  - Filtros por categoria, material e preço
  - Barra de busca funcional
  - Paginação
- **Carrinho de Compras**: 
  - Adicionar/remover produtos
  - Atualizar quantidades
  - Cálculo automático de totais
  - Persistência em localStorage
- **Perfil do Usuário**:
  - Editar informações pessoais
  - Gerenciar endereços
  - Histórico de pedidos
- **Gerenciamento de Estoque** (Admin):
  - Adicionar novos produtos
  - Editar produtos existentes
  - Deletar produtos
  - Gerenciar quantidades de estoque
  - Filtros e busca
  - Status de estoque (Disponível, Baixo estoque, Esgotado)

### 🎨 Design & UX

- Design moderno e profissional
- Cores: Verde (primário), Azul (secundário), Branco e tons de marrom
- Totalmente responsivo (Mobile First)
- Componentes reutilizáveis
- Navegação intuitiva

### 🔒 Segurança & Dados

- Autenticação simulada com localStorage
- Proteção de rotas (apenas usuários autenticados)
- Rotas administrativas protegidas
- Dados persistidos em localStorage

## 📁 Estrutura do Projeto

```
loja-embalagens/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Navbar.jsx       # Barra de navegação
│   │   ├── Footer.jsx       # Rodapé
│   │   ├── ProductCard.jsx  # Card de produto
│   │   └── ProtectedRoute.jsx # Proteção de rotas
│   ├── pages/               # Páginas da aplicação
│   │   ├── Login.jsx        # Login/Cadastro
│   │   ├── Home.jsx         # Página inicial
│   │   ├── Catalog.jsx      # Catálogo de produtos
│   │   ├── Cart.jsx         # Carrinho de compras
│   │   ├── Profile.jsx      # Perfil do usuário
│   │   └── Stock.jsx        # Gerenciamento de estoque
│   ├── contexts/            # Contextos React
│   │   ├── AuthContext.jsx  # Autenticação
│   │   ├── CartContext.jsx  # Carrinho
│   │   └── StockContext.jsx # Estoque
│   ├── services/            # Serviços e dados
│   │   └── mockData.js      # Dados mock de produtos
│   ├── utils/               # Utilitários
│   │   ├── useAuth.js       # Hook de autenticação
│   │   ├── useCart.js       # Hook de carrinho
│   │   └── useStock.js      # Hook de estoque
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Entrada da aplicação
│   └── index.css            # Estilos globais
├── public/                  # Arquivos estáticos
├── package.json             # Dependências
├── vite.config.js           # Configuração Vite
├── tailwind.config.js       # Configuração Tailwind
└── postcss.config.js        # Configuração PostCSS
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Instalação

1. **Navegue até a pasta do projeto:**
   ```bash
   cd loja-embalagens
   ```

2. **Instale as dependências (se ainda não fez):**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Abra no navegador:**
   ```
   http://localhost:5173
   ```

## 🔐 Credenciais de Teste

### Cliente Regular
- **Email**: qualquer email (ex: cliente@email.com)
- **Senha**: qualquer senha (ex: 123456)
- Acesso a: Home, Catálogo, Carrinho, Perfil

### Administrador
- **Email**: qualquer email (ex: admin@email.com)
- **Senha**: qualquer senha (ex: 123456)
- **Senha Admin**: `admin123` (obrigatória)
- Acesso a: Home, Catálogo, Gerenciamento de Estoque

## 📱 Páginas e Rotas

| Rota | Página | Acesso |
|------|--------|--------|
| `/` | Home | Público |
| `/login` | Login/Cadastro | Público |
| `/catalogo` | Catálogo de Produtos | Público |
| `/carrinho` | Carrinho de Compras | Autenticado |
| `/perfil` | Perfil do Usuário | Autenticado |
| `/estoque` | Gerenciamento de Estoque | Admin |

## 🛠️ Tecnologias Utilizadas

- **React 19**: Framework JavaScript
- **Vite**: Build tool e dev server
- **React Router v7**: Roteamento
- **Tailwind CSS**: Estilização
- **LocalStorage**: Persistência de dados
- **JavaScript ES6+**: Linguagem

## 📦 Dependências Principais

```json
{
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-router-dom": "^7.0.0",
  "tailwindcss": "^4.2.4"
}
```

## 🎓 Funcionalidades Avançadas

### Contextos React
- **AuthContext**: Gerencia autenticação e estado do usuário
- **CartContext**: Gerencia carrinho de compras com persistência
- **StockContext**: Gerencia produtos e estoque

### Hooks Customizados
- `useAuth()`: Acesso ao contexto de autenticação
- `useCart()`: Acesso ao contexto do carrinho
- `useStock()`: Acesso ao contexto de estoque

### Proteção de Rotas
- `ProtectedRoute`: Componente que protege rotas autenticadas
- Suporte a rotas administrativas com verificação de permissões

## 💾 Dados Persistidos

Os seguintes dados são salvos em localStorage:

- **user**: Dados do usuário autenticado
- **cart**: Itens do carrinho
- **products**: Lista de produtos e estoque

## 🎨 Customização

### Cores
As cores podem ser customizadas em `tailwind.config.js`:
- **primary**: Verde (padrão)
- **secondary**: Azul (padrão)
- **accent**: Roxo (padrão)

### Produtos
Os produtos mock podem ser editados em `src/services/mockData.js`

### Categorias
As categorias estão definidas em `src/services/mockData.js` e podem ser expandidas

## 🐛 Troubleshooting

### Porta 5173 já está em uso
```bash
# Use uma porta diferente
npm run dev -- --port 3000
```

### Erro de módulos não encontrados
```bash
# Limpe node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Tailwind CSS não está funcionando
```bash
# Verifique se o arquivo index.css está importado em main.jsx
# Verifique se tailwind.config.js está configurado corretamente
```

## 📝 Notas Importantes

- Este é um projeto de demonstração com dados simulados
- Nenhuma compra real será processada
- Os dados são salvos apenas localmente (localStorage)
- Para produção, seria necessário integrar com um backend real

## 🚀 Próximos Passos (Sugestões)

1. Integrar com backend real (Node.js, Django, etc.)
2. Implementar pagamento real (Stripe, PayPal)
3. Adicionar sistema de notificações por email
4. Implementar avaliações e comentários de produtos
5. Adicionar sistema de cupons e promoções
6. Melhorar SEO e performance
7. Adicionar testes unitários e E2E

## 📄 Licença

Este projeto é fornecido como exemplo educacional.

## 👨‍💻 Desenvolvido com ❤️

Criado com React, Vite e Tailwind CSS para demonstrar boas práticas de desenvolvimento web moderno.

---

**Versão**: 1.0.0  
**Última atualização**: Abril 2024  
**Status**: ✅ Funcional e pronto para uso
