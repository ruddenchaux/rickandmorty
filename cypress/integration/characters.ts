context('Characters', () => {
  before(() => {
    cy.visit('/');
  });

  it('Header contain Characters title', () => {
    cy.get('header').within(() => {
      cy.contains('Characters').should('exist');
    });
  });

  it('Have 20 Characters card', () => {
    cy.get('[data-cy=character-card]').should('have.length', 20);
  });

  it('CharacterCard have a name', () => {
    cy.get('[data-cy=character-name]').should('have.length', 20);
  });

  it('CharacterCard have a status and species', () => {
    cy.get('[data-cy=character-status-species]').should('have.length', 20);
  });

  it('CharacterCard have a last known position', () => {
    cy.get('[data-cy=character-last-known-position]').should('have.length', 20);
  });

  it('CharacterCard have a first seen in', () => {
    cy.get('[data-cy=character-first-seen-in]').should('have.length', 20);
  });

  describe('Characters infinite loading', () => {
    for (let i = 0; i < 2; i++) {
      it(`Loading page ${i + 1}`, () => {
        cy.clock();
        cy.get('main').scrollTo('bottom');
        cy.tick(3000);
        cy.get('[data-cy=character-card]').should('have.length', 20 * (i + 1));
      });
    }
  });
});
