context('Locations', () => {
  it('Header contain Locations title', () => {
    cy.visit('/locations');

    cy.get('header').within(() => {
      cy.contains('Locations');
    });
  });

  it('Failed status', () => {
    cy.intercept('POST', '/graphql').as('locations');
    cy.visit('/locations');

    cy.wait('@locations').then((interception) => {
      if (interception.response.body.errors?.length) {
        cy.contains('Ops.. Something went wrong! :-(');
      }
    });
  });

  describe.skip('Success suite', () => {
    before(() => {
      cy.visit('/locations');
    });
    it('Have 20 Locations card', () => {
      cy.get('[data-cy=location-card]').should('exist');
    });

    it('LocationCard have a name', () => {
      cy.get('[data-cy=location-name]').should('exist');
    });

    it('LocationCard have a favorites action', () => {
      cy.get('[data-cy=location-favorite-action]').should('exist');
      cy.get('[data-cy=location-not-favorite-icon]').should('exist');
    });

    it('Toggle favorite', () => {
      cy.get('[data-cy=location-favorite-action]').first().click();
      cy.get('[data-cy=location-favorite-icon]').should('exist');

      cy.get('[data-cy=location-favorite-action]').first().click();
      cy.get('[data-cy=location-not-favorite-icon]').should('exist');
    });

    it('LocationCard have a type', () => {
      cy.get('[data-cy=location-type]').should('exist');
    });

    it('LocationCard have a dimension', () => {
      cy.get('[data-cy=location-dimension]').should('exist');
    });

    it('LocationCard view more characters', () => {
      cy.get('[data-cy=characters-view-more]').first().click();
      cy.get('[data-cy=characters-fullscreen-dialog-content]').should('exist');
      cy.get('[data-cy=characters-fullscreen-dialog-title]').contains(/Residents of \w+ location/);
      cy.get('[data-cy=characters-fullscreen-close-btn]').click();
      cy.get('[data-cy=characters-fullscreen-dialog-content]').should('not.exist');
    });

    describe('LocationCard infinite loading', () => {
      for (let i = 0; i < 2; i++) {
        it(`Loading page ${i + 1}`, () => {
          cy.clock();
          cy.scrollTo('bottom');
          cy.tick(3000);
          cy.get('[data-cy=location-card]').should('have.length', 20 * (i + 1));
        });
      }
    });
  });
});
