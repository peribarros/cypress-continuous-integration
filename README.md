# Cypress in Continuous Integration

# Pre-requirements

It is required to have Node.js and npm installed to run this project.

I used versions 'v16.13.2' and '8.3.2' of Node.js and npm, respectively. I suggest you use the same or later versions.

# Installation
Run npm install (or npm i for the short version) to install the dev dependencies.

# Tests

You can run the tests simulating a desktop or mobile viewport

### Desktop

Run 'npm test' (or 'npm t' for the short version) to run the test in headless mode on a desktop viewport.

Or, run 'npm run cy:open' to open Cypress in interactive mode on a desktop viewport.

### Mobile

Run 'npm run test:mobile' (or npm t for the short version) to run the test in headless mode on a mobile viewport.

Or, run 'npm run cy:open:mobile' to open Cypress in interactive mode on a mobile viewport.

# Support this project
If you want to support this project, leave a ⭐.

----

This project was created with 💚 by Peri.

# Project description:



https://github.com/peribarros/cypress-continuous-integration/assets/71424123/dd8863bc-72e0-4186-ab1c-a28af09e0c15



- Cypress version 9.5.1
- Visit local and remote pages
- Deal with the most common elements found in web applications
- Test _upload_ of files
- Various checks of expected results
- Custom commands
- Links that open in another browser tab
- Tests simulating the dimensions of a mobile device
- Tests in a continuous integration _pipeline_ whenever changes occur in the application code (or tests)
- Update to Cypress version 13.6.2


### Tests result

✅ verifica o título da aplicação 

✅ preenche os campos obrigatórios e envia o formulário 

✅ exibe mensagem de erro ao submeter o formulário com um email com formatação inválida 

✅ campo telefone continua vazio quando preenchido com valor não-numérico 

✅ exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário 

✅ preenche e limpa os campos nome, sobrenome, email e telefone 

✅ exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios 

✅ envia o formuário com sucesso usando um comando customizado 

✅ seleciona um produto (YouTube) por seu texto 

✅ seleciona um produto (Mentoria) por seu valor (value) 

✅ seleciona um produto (Blog) por seu índice 

✅ marca o tipo de atendimento "Feedback" 

✅ marca cada tipo de atendimento 

✅ marca ambos checkboxes, depois desmarca o último 

✅ exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário 

✅ seleciona um arquivo da pasta fixtures 

✅ seleciona um arquivo simulando um drag-and-drop 

✅ seleciona um arquivo utilizando uma fixture para a qual foi dada um alias 

✅ verifica que a política de privacidade abre em outra aba sem a necessidade de um clique 

✅ acessa a página da política de privacidade removendo o target e então clicando no link 

✅ congelando o tempo e avançando em 3 segundos 

✅ por 3 vezes, executa o teste 

✅ por 3 vezes, executa o teste

✅ por 3 vezes, executa o teste 

✅ exibe e esconde as mensagens de sucesso e erro usando o .invoke 

✅ preenche a area de texto usando o comando invoke e repete 20 vezes texto 

✅ faz uma requisição HTTP 

✅ encontre o gato escondido na aplicação
