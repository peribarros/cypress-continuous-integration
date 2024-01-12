// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    // beforeEach - quer dizer antes de cada teste
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Este é o meu projeto de integração contínua'
        cy.get('#firstName').type('Peri')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('peribarros@gmail.com')
        // o padrão de delay do Cypress é 10
        cy.get('#open-text-area').type(longText, { delay: 0 })
        // classe button e a propriedade type submit 
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Peri')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('peribarros@e-mail-invalido')
        // o padrão de delay do Cypress é 10
        cy.get('#open-text-area').type('Texto de error')
        // classe button e a propriedade type submit 
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        //classe error
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            // 
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Peri')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('peribarros@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário')
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Peri')
            .should('have.value', 'Peri')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Barros')
            .should('have.value', 'Barros')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('peribarros@gmail.com')
            .should('have.value', 'peribarros@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('Preenche e limpa os campos nome, sobrenome, email e telefone')
            .should('have.value', 'Preenche e limpa os campos nome, sobrenome, email e telefone')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    // Aula 26 ------------------------------

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Peri')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('peribarros@gmail.com')
        // .check (melhor semântica), ao invés de .click
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        //cy.get('input[type="file"]#file-upload')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        //cy.get('input[type="file"]#file-upload')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('arquivoExemplo')
        cy.get('input[type="file"]')
        .selectFile('@arquivoExemplo')
        .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        // dentro do #privacy tem um a (link)
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    // Aula 26 ------------------------------

})// describe