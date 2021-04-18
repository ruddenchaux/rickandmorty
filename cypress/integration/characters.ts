context('Characters', () => {
  before(() => {
    cy.visit('/');
  });

  it('Header contain Characters title', () => {
    cy.get('header').within(() => {
      cy.contains('Characters');
    });
  });

  it('Have 20 Characters card', () => {
    cy.get('[data-cy=character-card]').should('have.length', 20);
  });

  it('CharacterCard have a name', () => {
    cy.get('[data-cy=character-name]').should('have.length', 20);
  });

  it('CharacterCard have a favorites action', () => {
    cy.get('[data-cy=character-favorite-action]').should('have.length', 20);
    cy.get('[data-cy=character-not-favorite-icon]').should('have.length', 20);
  });

  it('Toggle favorite', () => {
    cy.get('[data-cy=character-favorite-action]').first().click();
    cy.get('[data-cy=character-favorite-icon]').should('exist');

    cy.get('[data-cy=character-favorite-action]').first().click();
    cy.get('[data-cy=character-not-favorite-icon]').should('exist');
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
        cy.scrollTo('bottom');
        cy.tick(3000);
        cy.get('[data-cy=character-card]').should('have.length', 20 * (i + 1));
      });
    }
  });
});
