describe('Blogs App', () => {
  beforeEach(() => {
    cy.visit('')
  })
  it('login form is shown', () => {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })
})