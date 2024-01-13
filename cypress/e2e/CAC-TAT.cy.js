// CAC-TAT.cy.js created with Cypress

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    // beforeEach - quer dizer antes de cada teste
    const THREE_SECONDS_IN_MS = 3000
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
    //12  janeiro
    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

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

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('arquivoExemplo')
        cy.get('input[type="file"]')
            .selectFile('@arquivoExemplo')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        // dentro do #privacy tem um a (link)
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link',  function () {
        cy.get('#privacy a')
            //remove o atributo target
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })


    it('congelando o tempo e avançando em 3 segundos', function () {
        const longText = 'Congelando o tempo e avançando em 3 segundos, sem precisar esperar pelos 3 segundos no teste'
        // congela o relógio do navegador
        cy.clock()

        cy.get('#firstName').type('Peri')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('peribarros@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        // a mensagem de sucesso está visivel
        cy.get('.success').should('be.visible')

        // avança em 3 segundos no tempo
        cy.tick(THREE_SECONDS_IN_MS)

        // a mensagem de sucesso não está visivel
        cy.get('.success').should('not.be.visible')
    })

    Cypress._.times(3, function () {
        it('por 3 vezes, executa o teste', function () {
            cy.get('#phone')
                .type('abcdefghij')
                // 
                .should('have.value', '')
        })
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke',  function () {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke e repete 20 vezes texto',  function () {
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })
    it('faz uma requisição HTTP',  function () {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function (response) {
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    it('encontre o gato escondido na aplicação',  function () {
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
        cy.get('#title')
        .invoke('text', 'VIREI UM GATO 🐈')
        cy.get('#subtitle')
        .invoke('text', '28 testes realizados com sucesso')
    })

})
