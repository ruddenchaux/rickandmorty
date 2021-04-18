import itemsMenu from '../../src/utils/itemsMenu';

const openMenu = () => cy.get('[data-cy=button-menu]').click({ force: true });
const closeMenu = () => cy.get('body').click({ force: true });

context('Layout', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Header', () => {
    it('Header contain logo', () => {
      cy.get('header').within(() => {
        cy.get('[data-cy=logo]').should('have.attr', 'width', '40').should('have.attr', 'height', '40');
      });
    });

    it('Header contain title', () => {
      cy.get('header').within(() => {
        cy.contains('Rick and Morty');
      });
    });

    it('Header contain burger menu', () => {
      cy.get('header').within(() => {
        cy.get('[data-cy=button-menu]').should('exist');

        cy.viewport('iphone-x');
        cy.get('[data-cy=button-menu]').should('not.exist');
      });
    });

    it('Mobile header not contain burger menu', () => {
      cy.get('header').within(() => {
        cy.viewport('iphone-x');
        cy.get('[data-cy=button-menu]').should('not.exist');
      });
    });
  });

  describe('Sidebar', () => {
    describe('Contains links', () => {
      before(() => {
        openMenu();
      });

      after(() => {
        closeMenu();
      });

      itemsMenu.forEach((item) => {
        it(item.label, () => {
          cy.get('[data-cy=sidebar] [data-cy=item-menu]').within(() => {
            cy.contains(item.label);
            cy.get('[data-cy=item-menu-icon]').should('exist');
          });
        });
      });
    });

    describe('Navigate to routes', () => {
      beforeEach(() => {
        openMenu();
      });

      afterEach(() => {
        closeMenu();
      });

      itemsMenu.forEach((item) => {
        it(item.label, () => {
          cy.get(`[data-cy="item-menu"][href="${item.to}"]`).click();

          openMenu();
          cy.get(`[data-cy="item-menu"][href="${item.to}"]`).should('satisfy', ($el) =>
            $el[0].classList.contains('active')
          );

          cy.location().should((loc) => {
            expect(loc.pathname).to.include(item.to);
          });
        });
      });
    });
  });

  describe('Bottom navigation', () => {
    it('Not visible on desktop', () => {
      cy.get('[data-cy=bottom-navigation]').should('not.exist');
    });

    it('Visible on mobile', () => {
      cy.viewport('iphone-x');
      cy.get('[data-cy=bottom-navigation]').should('exist');
    });

    describe('Contains links', () => {
      beforeEach(() => {
        cy.viewport('iphone-x');
      });

      itemsMenu.forEach((item) => {
        it(item.label, () => {
          cy.get('[data-cy=bottom-navigation] [data-cy=bottom-navigation-action]').within(() => {
            cy.contains(item.label);
            cy.get('[data-cy=bottom-navigation-action-icon]').should('exist');
          });
        });
      });
    });

    describe('Navigate to routes', () => {
      beforeEach(() => {
        cy.viewport('iphone-x');
      });

      itemsMenu.forEach((item) => {
        it(item.label, () => {
          cy.get('[data-cy=bottom-navigation-action]').contains(item.label).click();

          cy.get('[data-cy=bottom-navigation-action]')
            .contains(item.label)
            .should('satisfy', ($el) => $el[0].classList.contains('Mui-selected'));

          cy.location().should((loc) => {
            expect(loc.pathname).to.include(item.to);
          });
        });
      });
    });
  });
});
