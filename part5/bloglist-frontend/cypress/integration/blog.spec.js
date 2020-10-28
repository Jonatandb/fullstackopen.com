describe('Bloglist app', () => {

  const name = 'Jonatandb testing user'
  const username = 'Jonatandb_Test'
  const password = '1234'

  const title = 'Blog created with Cypress'
  const author = 'Cypress'
  const url = 'url'

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
      cy.get('#loginButton').click()
      cy.contains(`${username} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(username)
      cy.get('#password').type('wrong password')
      cy.get('#loginButton').click()
      cy.contains('Wrong username or password').as('errorMessageDiv')
      cy.get('@errorMessageDiv')
        .should('have.css', 'border-style', 'solid')
      cy.get('@errorMessageDiv')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })

  describe('When logged in', function() {

    it('A blog can be created', function() {
      cy.login({ username, password })
      cy.contains('New blog').click()
      cy.get('#title').type(title)
      cy.get('#author').type(author)
      cy.get('#url').type(url)
      cy.get('#createBlogButton').click()
      cy.contains(`A new blog ${title} by ${author} added`)
      cy.contains(title)
    })

    describe('and when a blog exists', function() {

      beforeEach(() => {
        cy.login({ username, password })
        cy.createBlog({
          title,
          author,
          url
        })
      })

      it('the user can like the blog', () =>  {
        cy.get('#viewHideBlogDetailsButton').click()
        cy.get('#likeBlogButton').click()
        cy.contains('likes 1')
      })

      it('the user can delete the blog', () =>  {
        cy.get('#viewHideBlogDetailsButton').click()
        cy.get('#removeBlogButton').click()
        cy.get('html')
          .should('not.contain', title)
      })
    })

  })

  describe('When another user logged in', function() {

    it('it can\'t delete the blog created for other user', () =>  {

      // Login user 1
      cy.login({ username, password })

      // User 1 create a blog
      cy.createBlog({
        title,
        author,
        url
      })

      // Logout
      cy.get('#logoutButton').click()

      // User 2 creation
      const user = {
        name: 'Another user',
        username: 'SomeoneElse',
        password: '111'
      }

      cy.request('POST', 'http://localhost:3001/api/users', user)

      // Login user 2
      cy.login({ username:'SomeoneElse', password:'111' })

      // Blog created by user 1 is visible
      cy.get('html')
        .should('contain', title)

      // Click to see details
      cy.get('#viewHideBlogDetailsButton').click()

      // Remove button is not visible because logged user is not the owner
      cy.get('#removeBlogButton')
        .should('have.css','display','none')

    })

  })
})