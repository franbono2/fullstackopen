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
    cy.contains('login').click()
  })

  it('login form is shown', () => {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', () => {

    it('succeeds with correct credentials', () => {
      cy.login({ username: user.username, password: user.password })
      cy.contains(`Welcome: ${user.name}`)
    })
    
    it('fails with incorrect credentials', () => {
      cy.login({ username: 'fail', password: 'wrong' })
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', () => {
      const title = 'Blog test'
      const author = 'Cypress'
      cy.createBlog({
        title: title,
        author: author,
        url: '0.0.0.0'
      })
      cy.contains(title)
      cy.contains(author)
    })
  })
})