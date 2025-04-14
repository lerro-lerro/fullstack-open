describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpass'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
    cy.get('input[name="username"]')
    cy.get('input[name="password"]')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('input[name="username"]').type('testuser')
      cy.get('input[name="password"]').type('testpass')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('input[name="username"]').type('wronguser')
      cy.get('input[name="password"]').type('wrongpass')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'testpass' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('.togglable').within(() => {
        cy.get('input[name="title"]', { timeout: 10000 }).should('be.visible')
        cy.get('input[name="title"]').type('Test Blog')
        cy.get('input[name="author"]').type('Test Author')
        cy.get('input[name="url"]').type('http://test.com')
        cy.get('#create-button').click()
      })
      cy.contains('Test Blog Test Author')
    })

    it('a blog can be liked', function() {
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com'
      })
      cy.contains('view').click()
      cy.get('.likeButton').click()
      cy.contains('likes 1')
    })

    it('the user who added the blog can delete it', function() {
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com'
      })
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('Test Blog Test Author').should('not.exist')
    })

    it('blogs are sorted by likes with the most liked blog first', function() {
      cy.createBlog({
        title: 'Blog with 1 like',
        author: 'Test Author',
        url: 'http://test1.com'
      })
      cy.createBlog({
        title: 'Blog with 3 likes',
        author: 'Test Author',
        url: 'http://test2.com'
      })
      
      cy.contains('Blog with 3 likes').parent().as('blog3')
      cy.get('@blog3').contains('view').click()
      cy.get('@blog3').find('.likeButton').click().wait(500)
      cy.get('@blog3').find('.likeButton').click().wait(500)
      cy.get('@blog3').find('.likeButton').click().wait(500)

      cy.get('.blog').eq(0).should('contain', 'Blog with 3 likes')
      cy.get('.blog').eq(1).should('contain', 'Blog with 1 like')
    })
  })
})