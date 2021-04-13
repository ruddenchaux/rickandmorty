context('Characters', () => {
  before(() => {
    cy.visit('/');
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
});
