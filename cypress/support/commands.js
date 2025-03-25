// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
//     cy.get('#firstName').type('Alexandre')
//     cy.get('#lastName').type('Foletto')
//     cy.get('#email').type('gunsale@gmail.com')
//     cy.get('#open-text-area').type('Obrigado!')
//     cy.get('button[type="submit"]').click()
// }) 

// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data => {
//     cy.get('#firstName').type(data.firstName)
//     cy.get('#lastName').type(data.lastName)
//     cy.get('#email').type(data.email)
//     cy.get('#open-text-area').type(data.text)
//     cy.get('button[type="submit"]').click()
// }) 

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Tom',
    lastName: 'Hanks',
    email: 'teste@teste.com',
    text: 'Teste.'

}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
}) 