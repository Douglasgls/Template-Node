# 🛒 Template Node - E-commerce API com Pix

Este é um projeto de API REST desenvolvida com **Node.js** e **Express**, focado em simular um backend de e-commerce. A aplicação permite o gerenciamento de usuários, produtos, pedidos e carrinho de compras, além de realizar **cobranças via Pix em tempo real** utilizando a **API da Efi (antiga Gerencianet)**.

---

## 🔥 Funcionalidades

- ✅ Autenticação com JWT (login, proteção de rotas)
- 👤 Controle de acesso por tipo de usuário (`admin` e `user`)
- 🧾 CRUD completo para:
  - Usuários
  - Produtos
  - Pedidos (Orders)
  - Carrinho de compras (Cart)
- 💳 Integração com a **API Pix da Efi** para geração de cobranças via QR Code e payload dinâmico
- 🧩 Middlewares de autorização e validação
- 🗂️ Estrutura de projeto organizada por camadas (routes, controllers, services, middlewares, etc.)
- 📘 Documentação da API (Postman ou Swagger)

---

## 🧪 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [Efi API (Pix)](https://dev.efipay.com.br/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Axios](https://axios-http.com/) (para comunicação com a API Pix)
- [Nodemon](https://www.npmjs.com/package/nodemon) (ambiente de desenvolvimento)

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- Conta na [Efi](https://efipay.com.br/) com client_id e client_secret configurados

### Passos

```bash
# Clone o repositório
git clone https://github.com/Douglasgls/Template-Node

# Acesse o diretório
cd Template-Node

# Instale as dependências
npm install

# Configure o arquivo .env (base no .env.example)
cp .env.example .env

# Inicie o servidor em modo dev
npm run dev
