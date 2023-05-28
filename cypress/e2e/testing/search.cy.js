describe("Search", () => {
  before(() => {
    cy.visit("http://localhost:5173/");
    cy.wait(5000);
  });
  it("can search for a venue", () => {
    cy.get("#search").type("test", { delay: 100 });
    cy.get("#venues").find(":first-child h2").contains("test");
  });
});
