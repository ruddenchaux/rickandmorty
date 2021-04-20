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

function favoritesSelect(label: string, entity: string, initialVisitPath: string, skip: boolean = false) {
  it(label, function () {
    if (skip) {
      this.skip();
    }
    // visit to the entity favorites page
    cy.visit(initialVisitPath);

    // click on info link for add new favorites item and go on entity page
    cy.get('[data-cy="favorite-entity-path"]').click();

    // click on favorite action
    cy.get(`[data-cy=${entity}-favorite-action]`).first().click();

    // check if the action status are toggle
    cy.get(`[data-cy=${entity}-favorite-icon]`).should('exist');

    // turn back on favorites page
    cy.go('back');

    // check if the info link is not present
    cy.get('[data-cy="favorite-entity-path"]').should('not.exist');

    // check if have all favorites selected
    cy.get(`[data-cy=${entity}-card]`).should('exist');

    // click on unfavorite action
    cy.get(`[data-cy=${entity}-favorite-action]`).first().click();

    // check if not have favorites
    cy.get(`[data-cy=${entity}-card]`).should('not.exist');

    // check if exist initial info message with link
    cy.get('[data-cy="favorite-entity-path"]').should('exist');
  });
}

function snackbarNotification(label: string, entity: string, initialVisitPath: string, skip: boolean = false) {
  it(label, function () {
    if (skip) {
      this.skip();
    }
    // visit to the entity favorites page
    cy.visit(initialVisitPath);

    // click on favorite action
    cy.get(`[data-cy=${entity}-favorite-action]`).first().click();

    cy.get('[data-cy=favorite-snackbar-message]').contains('added');

    // click on unfavorite action
    cy.get(`[data-cy=${entity}-favorite-action]`).first().click();

    cy.get('[data-cy=favorite-snackbar-message]').contains('removed');
  });
}

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
        cy.get('[data-cy=button-menu]').click({ force: true });

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

  describe('Select favorites', () => {
    favoritesSelect('Characters', 'character', '/favorites');
    favoritesSelect('Locations', 'location', '/favorites/locations', true);
    favoritesSelect('Episodes', 'episode', '/favorites/episodes');
  });

  describe('Snackbar notification', () => {
    snackbarNotification('Characters', 'character', '/');
    snackbarNotification('Locations', 'location', '/locations', true);
    snackbarNotification('Episodes', 'episode', '/episodes');
  });
});
