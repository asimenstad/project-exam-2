const credentials = { name: "Test1234512345", email: "test1234512345@stud.noroff.no", password: "Asdfghjkl12345" };

describe("Login", () => {
  it("can login user", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("input[name=email]").type(credentials.email, { delay: 100 });
    cy.get("input[name=password]").type(credentials.password, { delay: 100 });
    cy.get("#submit").click();
    cy.url().should("include", "profile");
  });
});
