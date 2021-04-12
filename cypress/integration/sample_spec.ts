context('Home page', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Layout', () => {
    it('renders Characters', () => {
      cy.contains('Characters').should('exist');
    });
  });
});
