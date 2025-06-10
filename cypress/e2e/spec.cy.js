describe('Redditish post list page', () => {
  it('loads list of posts', () => {
    cy.visit('https://jenae-redditish.netlify.app/')

    //checks for posts section
    cy.contains('Top Posts').should('be.visible');

    //checks that posts render
    cy.get('.post-card')
    .should('have.length.greaterThan', 0)
    .first()
    .should('be.visible');

    cy.get('.post-card').each(($post) => {
      cy.wrap($post).find('.post-header').should('exist')
      cy.wrap($post).find('.post-content').should('exist')
    });
  })

  it('opens the detail page when a link is clicked, toggles comment expand button', () => {
    cy.visit('https://jenae-redditish.netlify.app/')

    //clicks first post
    cy.get('.post-card')
    .should('have.length.greaterThan', 0)
    .first()
    .find('a')
    .click();

    //checks for post detail content    
    cy.get('.post-card')
    .find('.post-detail-content')
    .should('exist');

    //checks for comment section
    cy.contains('Comments').should('be.visible');

    //check that comments render
    cy.get('.comment-card')
    .should('have.length.greaterThan', 0)
    .first()
    .should('be.visible')

    cy.get('.comment-card').each(($comment) => {
      cy.wrap($comment).find('.comment-header').should('exist')
      cy.wrap($comment).find('.comment-content').should('exist')
    });

    //expands first long comment
    cy.get('.toggle-button').first().click()
    
    //checks that the show less button exists
    cy.contains('Show less').should('exist')
  })

  it('should go back to the post list page when the go back link is clicked', () => {
    cy.visit('https://jenae-redditish.netlify.app/')

    //clicks first post
    cy.get('.post-card')
    .should('have.length.greaterThan', 0)
    .first()
    .find('a')
    .click();

    //clicks go back link
    cy.get('.go-back-container')
    .find('a')
    .click();
  })

  it('loads a new list of posts when searched', () => {
    cy.visit('https://jenae-redditish.netlify.app/')

    cy.get('.search-bar').type('gardening');

    cy.get('.submit-button').click();

    cy.get('.post-card', { timeout: 10000 }).should('have.length.greaterThan', 0);
  })
})