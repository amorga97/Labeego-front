// test.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
it("Login and logout", () => {
  cy.visit("http://localhost:4200/ ");
  cy.contains("Labego");
  cy.get('.login > [type="text"]').type("amorga97");
  cy.get('.login > [type="password"]').type("12345");
  cy.get(".login__submit").click();
  cy.get(".user-bar__options-dots").click();
  cy.contains("Logout").click({ force: true });
});
