// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    // beforeEach - antes de cada teste
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Peri')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('peribarros@gmail.com')
        cy.get('#open-text-area').type('Texto')
        // classe button e a propriedade type submit 
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

    })


  })