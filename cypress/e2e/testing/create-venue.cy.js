const credentials = { name: "Test1234512345", email: "test1234512345@stud.noroff.no", password: "Asdfghjkl12345" };

const venue = {
  name: "A-frame cabin",
  description: "Beautiful A-frame cabin in the forest",
  price: 1500,
  guests: 6,
  media:
    "https://images.unsplash.com/photo-1575403071235-5dcd06cbf169?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  address: "123 Street",
  city: "Rjukan",
  country: "Norway",
  continent: "Europe",
  zip: "1234",
};

describe("Create venue", () => {
  before(() => {
    cy.visit("http://localhost:5173/login");
    cy.get("input[name=email]").type(credentials.email, { delay: 100 });
    cy.get("input[name=password]").type(credentials.password, { delay: 100 });
    cy.get("#submit").click();
    cy.url().should("include", "profile");
  });

  it("should create a venue", () => {
    cy.wait(5000);
    cy.get("#venueForm").find("input[name='venueName']").type("A-frame cabin", { delay: 100 });

    cy.get("#venueForm").find("#description").type(venue.description, { delay: 100 });

    cy.get("#venueForm").find("input[name='price']").clear();
    cy.get("#venueForm").find("input[name='price']").type(venue.price, { delay: 100 });

    cy.get("#venueForm").find("input[name='maxGuests']").clear();
    cy.get("#venueForm").find("input[name='maxGuests']").type(venue.guests, { delay: 100 });

    cy.get("#venueForm").find("input[name='mediaString']").type(venue.media, { delay: 100 });
    cy.get("#addMedia").click({ delay: 1000 });
    cy.get("#venueForm").find("input[name='mediaString']").type(venue.media, { delay: 100 });
    cy.get("#addMedia").click({ delay: 1000 });
    cy.get("#imageArray").find(":first-child button").click({ delay: 1000 });

    cy.get("#venueForm").find("input[name='address']").type(venue.address, { delay: 100 });
    cy.get("#venueForm").find("input[name='city']").type(venue.city, { delay: 100 });
    cy.get("#venueForm").find("input[name='country']").type(venue.country, { delay: 100 });
    cy.get("#venueForm").find("input[name='continent']").type(venue.continent, { delay: 100 });
    cy.get("#venueForm").find("input[name='zip']").type(venue.zip, { delay: 100 });

    cy.get("#venueForm").find("input[name='wifi']").check({ delay: 100 });
    cy.get("#venueForm").find("input[name='parking']").check({ delay: 100 });
    cy.get("#venueForm").find("input[name='pets']").check({ delay: 100 });
    cy.get("#venueForm").find("input[name='breakfast']").check({ delay: 100 });

    cy.get("#venueForm").find("#submit").click();
  });
});
