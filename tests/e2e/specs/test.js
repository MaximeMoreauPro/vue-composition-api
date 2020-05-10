// https://docs.cypress.io/api/introduction/api.html

describe('Bookstore', () => {
  it('Should contain 15 books', () => {
    cy.visit('/')

    // Title should be '15 results'
    cy.contains('.books-result > h1', '15 results')
  })
})
