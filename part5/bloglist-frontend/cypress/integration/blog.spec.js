describe('Bloglist app', () => {

  const name = 'Jonatandb testing user'
  const username = 'Jonatandb_Test'
  const password = '1234'

  const title = 'Blog created with Cypress'
  const author = 'Cypress'
  const url = 'url'

  beforeEach( () => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name,
      username,
      password
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
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

  describe('When logged in', () => {

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

      it.only('the blogs are ordered according to likes, with the blog with the most likes being first', () =>  {

        cy.createBlog({
          title: title + ' 2',
          author,
          url
        })

        cy.createBlog({
          title: title + ' 3',
          author,
          url
        })

        cy.createBlog({
          title: title + ' 4',
          author,
          url
        })

        // Open all blogs details
        cy.get('[id^=viewHideBlogDetailsButton]').click({ multiple: true })

        // Get all like buttons and click twice in the 3rd blog like button
        cy.get('[id^=likeBlogButton]').then(buttons => {
          cy.wrap(buttons[buttons.length-2]).click().as('3rdButton')
          cy.wait(2000)
          cy.get('@3rdButton').click({ force: true })
          cy.wait(2000)
        })

        // The first one should be now the blog with title "Blog created with Cypress 3" and to have the 2 likes clicked before
        cy.get('[id^=likeBlogButton]').then(buttons => {
          cy.wrap(buttons[0]).parent().should('contain', 'likes 2')
        })

      })

    })

  })

})