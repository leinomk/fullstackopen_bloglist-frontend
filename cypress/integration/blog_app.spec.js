/*describe('Try server navigation', function() {
  it('should visit the site', function() {
    cy.visit('https://www.google.com')
    cy.contains('Google')
  })
})*/

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'janedoez',
      name: 'Jane Z. Doe',
      password: 'password',
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Log in to application')
  })

  it('login succeeds with correct credentials', function() {
    cy.contains('login')
    cy.get('#username').type('janedoez')
    cy.get('#password').type('password')
    cy.get('#loginbutton').click()

    cy.contains('Jane Z. Doe is logged in')
  })

  it('login fails with wrong credentials', function() {
    cy.contains('login')
    cy.get('#username').type('janedoez')
    cy.get('#password').type('wrongpassword')
    cy.get('#loginbutton').click()

    cy.get('.error').should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'janedoez', password: 'password' })
    })

    it('new blog can be added', function() {
      cy.contains('add new blog').click()
      cy.get('#title').type('the first blog')
      cy.get('#author').type('author of first blog')
      cy.get('#url').type('http://firsturl.com')
      cy.get('#addBlogButton').click()

      cy.get('.blogstyle').should('contain', 'the first blog, by author of first blog')
    })

    describe('and a blog is added', function() {
      beforeEach(function() {
        const blog1 = {
          title: 'first blog',
          author: 'author of the first blog',
          url: 'http://firsturl.com',
        }
        const blog2 = {
          title: 'second blog',
          author: 'author of the second blog',
          url: 'http://secondurl.com',
          likes: 2,
        }
        const blog3 = {
          title: 'third blog',
          author: 'author of the third blog',
          url: 'http://thirdurl.com',
          likes: 1,
        }
        cy.addBlog(blog1)
        cy.addBlog(blog2)
        cy.addBlog(blog3)
      })

      it('it can be liked', function() {
        cy.contains('second blog')
          .contains('show more')
          .click()

        cy.contains('second blog').parent()
          .find('#likeButton').as('likeButton2')

        cy.get('@likeButton2').click()

        cy.contains('second blog').parent()
          .contains('likes 3')
      })

      it('it can be deleted by the user who added it', function() {
        cy.contains('second blog')
          .contains('show more')
          .click()

        cy.contains('second blog').parent()
          .contains('remove')
          .click()

        cy.get('.notification').should('contain', `Blog 'second blog' by author of the second blog was deleted`)
          .and('have.css', 'color', 'rgb(0, 128, 0)')

        cy.get('.html').should('not.contain', 'second blog')
      })

      it.only('blogs are ordered correctly according to number of likes', function() {
        cy.get('.blogstyle').then( blogs => {
          console.log('number of blogs', blogs.length)
          cy.wrap(blogs[0]).should('contain', 'second blog')
          cy.wrap(blogs[1]).should('contain', 'third blog')
          cy.wrap(blogs[2]).should('contain', 'first blog')
        })
      })
    })
  })

})