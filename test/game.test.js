const request = require("supertest");
const app = require("../app.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

// Dijalankan sebelum automatic API testing
beforeAll(async () => {
  try {
    await queryInterface.bulkInsert("Games", [
      {
        id: 1001,
        title: "AAA",
        developer: "AAA",
        genres: "AAA",
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1002,
        title: "BBB",
        developer: "BBB",
        genres: "BBB",
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1003,
        title: "CCC",
        developer: "CCC",
        genres: "CCC",
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (err) {
    console.log(err);
  }
}, 30000); // Set timeout to 30000ms (30 seconds)

// Dijalankan setelah automatic API testing
afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Games", null, {});
  } catch (err) {
    console.log(err);
  }
}, 30000); // Set timeout to 30000ms (30 seconds)

// Automatic API TESTING
describe("GET Games", () => {
  it("List Games", async () => {
    const response = await request(app).get("/games").expect("Content-Type", /json/).expect(200);

    expect(response.body.length).toEqual(3);
    const games = response.body;
    const firstGame = games[0];
    expect(firstGame.id).toEqual(1001);
    expect(firstGame.title).toEqual("AAA");
  });

  it("Get Detail Games", async () => {
    const response = await request(app).get(`/games/${1001}`).expect("Content-Type", /json/).expect(200);

    const game = response.body;
    expect(game.id).toEqual(1001);
    expect(game.title).toEqual("AAA");
    expect(game.year).toEqual(2022);
    expect(game.developer).toEqual("AAA");
  });

  it("Test Error Not Found", async () => {
    const response = await request(app).get(`/games/${1001123123}`).expect("Content-Type", /json/).expect(404);

    const { message } = response.body;
    expect(message).toBe("Error Not Found");
  });
});
