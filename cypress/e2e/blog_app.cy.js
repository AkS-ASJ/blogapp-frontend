describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Jen Doe',
      username: 'jenny',
      password: 'password'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jenny')
      cy.get('#password').type('password')
      cy.contains('Login').click()

      cy.contains('Jen Doe logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('jenny')
      cy.get('#password').type('wrong')
      cy.contains('Login').click()

      cy.contains('Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 255, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function () {
      cy.get('#username').type('jenny')
      cy.get('#password').type('password')
      cy.contains('Login').click()

      cy.createBlog({title: 'first blog', author: 'Mirajane', url: 'www.bloglist.com'})
      cy.createBlog({title: 'second blog', author: 'Madao', url: 'www.bloglist.com'})
      cy.createBlog({title: 'third blog', author: 'Jones', url: 'www.bloglist.com'})

      cy.contains('second blog')
          .contains('View').click().contains('like').click().click()
    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('Fourth blog added')
      cy.get('#author').type('Myself')
      cy.get('#url').type('www.myfirstblog.com')
      cy.contains('Create').click()

      cy.contains('Fourth blog added')
    })

    it('liking a post is possible', function () {
      cy.contains('second blog')
          .contains('View').click()
          .contains('like').click()

      cy.contains('second blog')
          .contains('View').click()
          .contains(1)
    });

    it('deleting a post is possible', function () {
      cy.contains('second blog')
          .contains('View').click()
          .contains('Remove').click()

      cy.get('second blog').should('not.exist')
      !cy.contains('second blog')
    })

    it('other users but the creator do not see the remove button', function () {
      const user = {
        name: 'John Doe',
        username: 'john',
        password: 'doe'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

      cy.contains('Log out').click()
      cy.get('#username').type('john')
      cy.get('#password').type('doe')
      cy.contains('Login').click()

      cy.contains('second blog').get('remove').should('not.exist')
    })

    it('Blogs are ordered by likes count', function () {
      cy.contains('third blog')
          .contains('View').click().contains('like').click()

      cy.get('.blog').eq(0).should('contain', 'second blog')
      cy.get('.blog').eq(1).should('contain', 'third blog')
      cy.get('.blog').eq(2).should('contain', 'first blog')
      /*
      cy.get('#likes')
            .should('contain', '10')
            .should('not.contain', '7')
       */
    })
  })
})