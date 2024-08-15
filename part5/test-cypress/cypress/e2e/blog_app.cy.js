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
      cy.get('.blog').contains(title)
      cy.get('.blog').contains(author)
    })

    describe('When blog is created', () => {
      const title = 'Blog test'
      beforeEach(() => {
        cy.createBlog({
          title: title,
          author: 'Cypress',
          url: '0.0.0.0'
        })
        cy.get('.blog').contains('view').click()
      })

      it('You can like a blog', () => {
        cy.get('#like-button').click()
        cy.contains(`blog ${title} has one more like`)
      })

      it('You can delete a blog', () => {
        cy.get('#remove-button').should('be.visible').click()
        cy.contains(`The blog ${title} has been deleted`)
      })
    })
  })
})