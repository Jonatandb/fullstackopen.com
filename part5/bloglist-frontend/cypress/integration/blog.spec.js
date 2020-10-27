describe('Bloglist app', () => {

  const name = 'Jonatandb testing user'
  const username = 'Jonatandb_Test'
  const password = '1234'

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name,
      username,
      password
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', ( ) => {
    cy.contains('Log in to application')
    cy.contains('Username:')
    cy.contains('Password:')
    cy.contains('Login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.contains('Login').click()
      cy.contains(`${username} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(username)
      cy.get('#password').type('wrong password')
      cy.contains('Login').click()
      cy.contains('Wrong username or password').as('errorMessageDiv')
      cy.get('@errorMessageDiv').should('have.css', 'border-style', 'solid')
      cy.get('@errorMessageDiv').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })

  describe('When logged in', function() {

    it('A blog can be created', function() {
      cy.login({ username, password })
      const blogTitle = 'Blog created with Cypress'
      const author = 'Cypress'
      cy.contains('New blog').click()
      cy.get('#title').type(blogTitle)
      cy.get('#author').type(author)
      cy.get('#url').type('url')
      cy.get('.formDiv > button').click()
      cy.contains(`A new blog ${blogTitle} by ${author} added`)
      cy.get('.blogData').should('contain', blogTitle)
    })

    describe('and a blog exists', function() {
      const title = 'Blog created with Cypress'
      const author = 'Cypress'
      const url = 'url'

      beforeEach(() => {
        cy.login({ username, password })
        cy.createBlog({
          title,
          author,
          url
        })
      })

      it('the user can like a blog', () =>  {
        cy.get('.blogData > button').click()
        cy.get('.blogDetails > :nth-child(2)').click()
        cy.contains('likes 1')
      })

    })

  })

})