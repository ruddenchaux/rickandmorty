context('Episodes', () => {
  before(() => {
    cy.visit('/episodes');
  });

  it('Header contain Episodes title', () => {
    cy.get('header').within(() => {
      cy.contains('Episodes');
    });
  });

  it('Have 20 Episodes card', () => {
    cy.get('[data-cy=episode-card]').should('exist');
  });

  it('EpisodeCard have a name', () => {
    cy.get('[data-cy=episode-name]').should('exist');
  });

  it('EpisodeCard have a favorites action', () => {
    cy.get('[data-cy=episode-favorite-action]').should('exist');
    cy.get('[data-cy=episode-not-favorite-icon]').should('exist');
  });

  it('Toggle favorite', () => {
    cy.get('[data-cy=episode-favorite-action]').first().click();
    cy.get('[data-cy=episode-favorite-icon]').should('exist');

    cy.get('[data-cy=episode-favorite-action]').first().click();
    cy.get('[data-cy=episode-not-favorite-icon]').should('exist');
  });

  it('EpisodeCard have a episode', () => {
    cy.get('[data-cy=episode-episode]').should('exist');
  });

  it('EpisodeCard have a air date', () => {
    cy.get('[data-cy=episode-air-date]').should('exist');
  });

  describe('EpisodeCard infinite loading', () => {
    for (let i = 0; i < 2; i++) {
      it(`Loading page ${i + 1}`, () => {
        cy.clock();
        cy.scrollTo('bottom');
        cy.tick(3000);
        cy.get('[data-cy=episode-card]').should('have.length', 20 * (i + 1));
      });
    }
  });

  it('EpisodeCard view more characters', () => {
    cy.get('[data-cy=characters-view-more]').first().click();
    cy.get('[data-cy=characters-fullscreen-dialog-content]').should('exist');
    cy.get('[data-cy=characters-fullscreen-dialog-title]').contains(/Characters in \w+ episode/);
    cy.get('[data-cy=characters-fullscreen-close-btn]').click();
    cy.get('[data-cy=characters-fullscreen-dialog-content]').should('not.exist');
  });
});
