Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Peri')
    cy.get('#lastName').type('Barros')
    cy.get('#email').type('peribarros@gmail.com')
    cy.get('#open-text-area').type('Comando customizado')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})