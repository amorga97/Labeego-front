// test.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
it("Login and logout", () => {
  cy.visit("http://localhost:4200/ ");
  cy.contains("Labeego");
  cy.get('.login > [type="text"]').type("cypressTest");
  cy.get('.login > [type="password"]').type("12345");
  cy.get(".login__submit").click();
  cy.get(".user-bar__options-dots").click();
  cy.contains("Logout").click({ force: true });
});

it("Login and create new project", () => {
  const dataTransfer = new DataTransfer();

  cy.visit("http://localhost:4200/ ");
  cy.contains("Labeego");
  cy.get('.login > [type="text"]').type("cypressTest");
  cy.get('.login > [type="password"]').type("12345");
  cy.get(".login__submit").click();
  cy.get(".alert__message").should("be.visible");
  cy.wait(2100);
  cy.get(".alert__message").should("not.exist");
  cy.get(".new-project-card").click();
  cy.get("#title").type("Reforma oficinas ISDI Coders");
  cy.get("#description").type(
    "Oficinas isdi coders Madrid. Reforma completa del espacio."
  );
  cy.get(".form__submit").click();
  cy.contains("Carmen").click();
  cy.get(".form__submit--project").click();
  cy.get("#project-form > #title")
    .clear()
    .type("Reforma oficinas ISDI Coders Madrid.");
  cy.get("#description").clear();
  cy.get("#description").type(
    "Oficinas isdi coders Madrid. Reforma completa del espacio. Mobiliario USM"
  );
  cy.get('.project-form__buttons > [type="submit"]').click({ force: true });
  cy.get(".alert__message").should("be.visible");
  cy.wait(2100);
  cy.get(".alert__message").should("not.exist");

  cy.get("#client-form > :nth-child(2) > #title").clear().type("123 123 123");
  cy.get('[formcontrolname="number"]').clear().type("20");
  cy.get('.client-form__buttons > [type="submit"]').click();
  cy.get(".alert__message").should("be.visible");
  cy.wait(2100);
  cy.get(".alert__message").should("not.exist");

  cy.get('[type="button"]').click();
  cy.get('.appointment__form-buttons > [type="submit"]').click();
  cy.get(".alert__message").should("be.visible");
  cy.wait(2100);
  cy.get(".alert__message").should("not.exist");

  cy.get(".user-bar__data-name").click();
});

it("Login and delete a project", () => {
  const dataTransfer = new DataTransfer();

  cy.visit("http://localhost:4200/ ");
  cy.contains("Labeego");
  cy.get('.login > [type="text"]').type("cypressTest");
  cy.get('.login > [type="password"]').type("12345");
  cy.get(".login__submit").click();
  cy.get(".alert__message").should("be.visible");
  cy.wait(2100);
  cy.get(".alert__message").should("not.exist");
  cy.get(".project-card").click();
  cy.wait(2000);
  cy.get(".project-form__button--delete").click();
});
