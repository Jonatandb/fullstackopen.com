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

})