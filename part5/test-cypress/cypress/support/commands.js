Cypress.Commands.add('login', ({ username, password }) => {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.contains('new Blog').click()
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.get('#create-note-button').click()
  cy.visit('')
})