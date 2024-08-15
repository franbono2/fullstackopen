describe('Blogs App', () => {
  const user = {
    name: "User test",
    username: "test",
    password: "test"
  }
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/test/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('login form is shown', () => {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', () => {
    beforeEach(() => {
      cy.contains('login').click()
    })

    it('succeeds with correct credentials', () => {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains(`Welcome: ${user.name}`)
    })
    
    it('fails with incorrect credentials', () => {
      cy.get('#username').type('fail')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })
})