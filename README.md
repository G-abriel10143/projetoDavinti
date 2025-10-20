# Agenda Telefônica Web - Davinti

Bem-vindo à **Agenda Telefônica Web**, desenvolvida para a **Davinti**, uma aplicação moderna para cadastrar, pesquisar, editar e excluir contatos, com suporte a múltiplos telefones por pessoa e registro de logs de exclusão.

---

## 📝 Funcionalidades

- **Cadastro de Contatos**: Nome, idade e múltiplos telefones.  
- **Pesquisa Dinâmica**: Buscar contatos por nome ou número de telefone.  
- **Edição de Contatos**: Atualizar informações de forma rápida.  
- **Exclusão de Contatos**: Remove contatos e registra em **log.txt** a data, hora e nome do contato excluído.  
- **Validações**:
  - Nome: apenas letras e espaços.  
  - Telefone: apenas números.  
- **Front-end Moderno**: Layout elegante usando **Bootstrap**.  

---

## 💻 Tecnologias Utilizadas

- **Node.js & Express** – Servidor backend.  
- **MySQL** – Banco de dados relacional.  
- **Bootstrap 5** – Interface responsiva e atraente.  
- **HTML, CSS, JavaScript** – Estrutura e interação do front-end.  
- **fs (Node.js)** – Registro de logs de exclusão.  

---

## 🗄 Estrutura do Banco de Dados

- **Tabela `Contato`**:
  - `id` (INT, PK, AUTO_INCREMENT)
  - `nome` (VARCHAR)
  - `idade` (INT)

- **Tabela `Telefone`**:
  - `id` (INT, PK, AUTO_INCREMENT)
  - `contato_id` (INT, FK → Contato.id)
  - `numero` (VARCHAR)

---

## ⚡ Como Rodar o Projeto

1. Clone o repositório:  
   ```bash
   git clone https://github.com/seuusuario/agenda-telefonica-davinti.git
Instale as dependências:

bash
Copiar código
cd agenda-telefonica-davinti
npm install
Configure o banco de dados MySQL no server.js:

js
Copiar código
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Gaga9090.',
  database: 'AgendaDB'
});
Crie o banco e tabelas (importando AgendaDB.sql ou criando manualmente).

Inicie o servidor:

bash
Copiar código
node server.js
Abra o navegador em:

arduino
Copiar código
http://localhost:3000
📂 Estrutura do Projeto
pgsql
Copiar código
agenda-telefonica-davinti/
│
├─ public/           # Front-end HTML, CSS, JS
│   ├─ index.html
│   ├─ style.css
│   └─ script.js
│
├─ server.js         # Servidor Node.js
├─ package.json      # Dependências
└─ log.txt           # Registro de exclusões
📌 Observações
Todos os contatos excluídos são registrados automaticamente em log.txt.

O front-end impede entrada inválida: letras em telefone e números no nome.

Aplicação responsiva e compatível com dispositivos móveis.

Projeto desenvolvido como desafio para a Davinti.

👨‍💻 Autor
Gabriel Alves – Desenvolvedor Full Stack

🚀 Contribuições
Contribuições são bem-vindas! Abra um pull request ou reporte problemas no Issues do projeto.

