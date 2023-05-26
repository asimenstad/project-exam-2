const credentials = {
  name: `Test${Math.floor(Math.random() * 1000)}`,
  email: `test${Math.floor(Math.random() * 1000)}@stud.noroff.no`,
  password: `Asdfghj${Math.floor(Math.random() * 1000)}`,
};

describe("Register", () => {
  it("can register user", () => {
    cy.visit("http://localhost:5173/register");
    cy.get("input[name='name']").type(credentials.name, { delay: 100 });
    cy.get("input[name='email']").type(credentials.email, { delay: 100 });
    cy.get("input[name='password']").type(credentials.password, { delay: 100 });
    cy.get("input[name='venueManager']").check();
    cy.get("#submit").click();
    cy.url().should("include", "login");
  });
});
