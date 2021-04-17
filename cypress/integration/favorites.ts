const itemsTab = [
  {
    label: 'Characters',
    to: '/favorites'
  },
  {
    label: 'Locations',
    to: '/favorites/locations'
  },
  {
    label: 'Episodes',
    to: '/favorites/episodes'
  }
];

context('Favorites', () => {
  before(() => {
    cy.visit('/favorites');
  });

  it('Header contain Favorites title', () => {
    cy.get('header').within(() => {
      cy.contains('Favorites');
    });
  });

  it('Have Characters tab', () => {
    cy.contains('Characters');
  });

  it('Have Episodes tab', () => {
    cy.contains('Episodes');
  });

  it('Have Locations tab', () => {
    cy.contains('Locations');
  });

  describe('Tab navigation', () => {
    itemsTab.forEach((item) => {
      it(item.label, () => {
        cy.get(`[data-cy="favorites-link"][href="${item.to}"]`).click();

        // check browser address is update
        cy.location().should((loc) => {
          expect(loc.pathname).to.include(item.to);
        });

        // check if tab is selected
        cy.get(`[data-cy="favorites-link"][href="${item.to}"]`).should('satisfy', ($el) =>
          $el[0].classList.contains('Mui-selected')
        );

        // open side menu
        cy.get('[data-cy=button-menu]').click();

        // check if sidebar Favorites menu item is selected
        cy.get('[data-cy="item-menu"][href="/favorites"]').should('satisfy', ($el) =>
          $el[0].classList.contains('active')
        );

        // close side menu
        cy.get('body').click();

        // check bottom navigation on mobile
        cy.viewport('iphone-x');

        // check if Favorites item is selected on bottom navigation
        cy.get('[data-cy=bottom-navigation-action]')
          .contains('Favorites')
          .should('satisfy', ($el) => $el[0].classList.contains('Mui-selected'));
      });
    });
  });
});
