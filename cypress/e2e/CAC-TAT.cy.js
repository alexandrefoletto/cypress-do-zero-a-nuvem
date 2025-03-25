describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('#firstName').type('Alexandre')
    cy.get('#lastName').type('Foletto')
    cy.get('#email').type('gunsale@gmail.com')
    // cy.get('#open-text-area').type('Obrigado!')
    // cy.get('#open-text-area').type('Curso de Cypress, do zero a nuvem. Um ótimo curso para iniciantes (nem tanto) em automação de testes', {delay: 0})
    cy.get('#open-text-area').type(longText, {delay: 0})
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com email com formatação inválida', () => {
    cy.get('#firstName').type('Alexandre')
    cy.get('#lastName').type('Foletto')
    cy.get('#email').type('gunsale@gmail.')
    cy.get('#open-text-area').type('Obrigado!')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    
  })

  it('verifica se o campo continua vazio ao digitar valor não-numérico no campo de telefone', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
  
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox').check()
    //cy.contains('[for="phone-checkbox"]', 'Telefone').check()
    cy.get('#firstName').type('Arnoldo')
    cy.get('#lastName').type('Chuarszeneguer')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('Teste!')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Arnoldo')
      .should('have.value', 'Arnoldo')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Chuarszeneguer')
      .should('have.value', 'Chuarszeneguer')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@teste.com')
      .should('have.value', 'teste@teste.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    // const data = {
    //   firstName: 'Alexandre',
    //   lastName: 'Foletto',
    //   email: 'gunsale@gmail.com',
    //   text: 'Teste'
    // }

    // cy.fillMandatoryFieldsAndSubmit(data)
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
    
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    // cy.get('input[type="radio"][value="ajuda"]')
    //   .check()
    //   .should('be.checked')
    // cy.get('input[type="radio"][value="elogio"]')
    //   .check()
    //   .should('be.checked')
    // cy.get('input[type="radio"][value="feedback"]')
    //   .check()
    //   .should('be.checked')
    cy.get('input[type="radio"]')
      .each(tipoAtendimento => {
        cy.wrap(tipoAtendimento)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    // FORMA 1
    // cy.get('#email-checkbox')
    //   .check()
    //   .should('be.checked')
    
    // cy.get('#phone-checkbox')
    //   .check()
    //   .should('be.checked')
    
    // cy.get('#phone-checkbox')
    //   .uncheck()
    //   .should('not.to.be.checked')

    // FORMA 2
    // cy.get('input[type="checkbox"]')
    //   .each(meioContato => {
    //     cy.wrap(meioContato)
    //       .check()
    //       .should('be.checked')
    //   })
    
    // cy.get('input[type="checkbox"]')
    //   .last()
    //   .uncheck()
    //   .should('not.be.checked')

    // FORMA 3
    // cy.get('input[type="checkbox"]')
    //   .as('checkboxes')
    //   .check()

    // cy.get('@checkboxes')
    //   .each(checkbox => {
    //     expect(checkbox[0].checked).to.equal(true)
    //   })

    // FORMA 4 - resolução do professor
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    // FORMA 1
    // cy.get('input[type="file"]')
    //   .selectFile('cypress/fixtures/example.json')
    //   .then(input => {
    //     expect(input[0].files[0].name).to.equal('example.json')
    //   })

    // FORMA 2
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('samplefile')
    cy.get('#file-upload')
      .selectFile('@samplefile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica se a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    //cy.get('a').should('have.attr', 'target', '_blank')
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  it('testa a página da política de privacidade de forma independente', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
    
    cy.get('#white-background')
      .should('be.visible')
      .get('p')
      .contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
      
  })

})