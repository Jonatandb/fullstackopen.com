describe('Bloglist app', () => {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', ( ) => {
    cy.contains('Log in to application')
    cy.contains('Username:')
    cy.contains('Password:')
    cy.contains('Login')
  })

})