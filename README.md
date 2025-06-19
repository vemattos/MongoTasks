# Mongo Tasks

Projeto simples de gerenciador de tarefas com backend em Spring Boot e banco de dados MongoDB, e frontend em HTML/CSS/JavaScript puro.  
O diferencial do projeto é a estrutura flexível das tarefas, que podem ter diferentes tipos e campos personalizados, aproveitando a flexibilidade do MongoDB.

---

## Funcionalidades

- Cadastro e login simples de usuários (sem autenticação JWT, apenas validação básica)
- Criação de tarefas personalizadas com tipos variados (Bug, Evento, Lembrete, Meta, Estudo, Checklist)
- Cada tipo de tarefa possui campos específicos dinamicamente renderizados no frontend
- Visualização das tarefas do usuário logado
- Logout e persistência do usuário logado via `localStorage`
- Interface responsiva e estilizada com foco em usabilidade

---

## Tecnologias

- Backend:
  - Java 17+
  - Spring Boot
  - Spring Data MongoDB
  - Maven
- Banco de dados:
  - MongoDB
- Frontend:
  - HTML5, CSS3
  - JavaScript puro (Vanilla JS)
  
---

## Rodando o projeto

### Backend

1. Configure o MongoDB local ou remoto e atualize a string de conexão no `application.properties`.
2. Compile e execute a aplicação Spring Boot:
   ```bash
   mvn clean install
   mvn spring-boot:run
3. A API estará disponível em http://localhost:8080/api.

### Frontend

1. Abra os arquivos HTML diretamente no navegador ou sirva-os via servidor web local.
2. Faça o cadastro, login e gerencie suas tarefas!

3. Cada tarefa contém os seguintes campos:
   ```bash
   title: título da tarefa
   description: descrição opcional
   status: pendente, em andamento ou feito
   type: tipo da tarefa (bug, evento, lembrete, meta, estudo, checklist)
   userId: ID do usuário dono da tarefa
   data: objeto JSON com campos personalizados conforme o tipo da tarefa
