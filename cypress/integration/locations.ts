context('Locations', () => {
  before(() => {
    cy.visit('/locations');
  });

  it('Header contain Locations title', () => {
    cy.get('header').within(() => {
      cy.contains('Locations').should('exist');
    });
  });

  it('Have 20 Locations card', () => {
    cy.get('[data-cy=location-card]').should('have.length', 20);
  });

  it('LocationCard have a name', () => {
    cy.get('[data-cy=location-name]').should('have.length', 20);
  });

  it('LocationCard have a type', () => {
    cy.get('[data-cy=location-type]').should('have.length', 20);
  });

  it('LocationCard have a dimension', () => {
    cy.get('[data-cy=location-dimension]').should('have.length', 20);
  });

  describe('LocationCard infinite loading', () => {
    for (let i = 0; i < 2; i++) {
      it(`Loading page ${i + 1}`, () => {
        cy.clock();
        cy.get('main').scrollTo('bottom');
        cy.tick(3000);
        cy.get('[data-cy=location-card]').should('have.length', 20 * (i + 1));
      });
    }
  });
});
