// const request = require("supertest");
// const app = require("../app.js");
// const { sequelize } = require("../models");
// const { queryInterface } = sequelize;

// // Dijalankan sebelum automatic API testing
// beforeAll(async () => {
//   try {
//     await queryInterface.bulkInsert("Games", [
//       {
//         id: 1001,
//         title: "AAA",
//         developer: "AAA",
//         genres: "AAA",
//         year: 2022,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: 1002,
//         title: "BBB",
//         developer: "BBB",
//         genres: "BBB",
//         year: 2022,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: 1003,
//         title: "CCC",
//         developer: "CCC",
//         genres: "CCC",
//         year: 2022,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ]);
//   } catch (err) {
//     console.log(err);
//   }
// }, 30000); // Set timeout to 30000ms (30 seconds)

// // Dijalankan setelah automatic API testing
// afterAll(async () => {
//   try {
//     await queryInterface.bulkDelete("Games", null, {});
//   } catch (err) {
//     console.log(err);
//   }
// }, 30000); // Set timeout to 30000ms (30 seconds)

// // Automatic API TESTING
// describe("GET Games", () => {
//   it("List Games", async () => {
//     const response = await request(app).get("/games").expect("Content-Type", /json/).expect(200);

//     expect(response.body.length).toEqual(3);
//     const games = response.body;
//     const firstGame = games[0];
//     expect(firstGame.id).toEqual(1001);
//     expect(firstGame.title).toEqual("AAA");
//   });

//   it("Get Detail Games", async () => {
//     const response = await request(app).get(`/games/${1001}`).expect("Content-Type", /json/).expect(200);

//     const game = response.body;
//     expect(game.id).toEqual(1001);
//     expect(game.title).toEqual("AAA");
//     expect(game.year).toEqual(2022);
//     expect(game.developer).toEqual("AAA");
//   });

//   it("Test Error Not Found", async () => {
//     const response = await request(app).get(`/games/${1001123123}`).expect("Content-Type", /json/).expect(404);

//     const { message } = response.body;
//     expect(message).toBe("Error Not Found");
//   });
// });

const request = require("supertest");
const app = require("../app.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

// Dijalankan sebelum automatic API testing
beforeAll((done) => {
  queryInterface
    .bulkInsert("Games", [
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
    ])
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
    });
});

// Dijalankan setelah automatic API testing
afterAll((done) => {
  // Cleaning Database

  queryInterface
    .bulkDelete("Games", null, {})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
    });
});

// Automatic API TESTING

describe("GET Games", () => {
  it("List Games", (done) => {
    // supertest
    request(app)
      .get("/games")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toEqual(3);
        const games = response.body;
        const firstGame = games[0];
        expect(firstGame.id).toEqual(1001);
        expect(firstGame.title).toEqual("AAA");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it("Get Detail Games", (done) => {
    // supertest
    request(app)
      .get(`/games/${1001}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body, "<<<<<<");
        const game = response.body;
        expect(game.id).toEqual(1001);
        expect(game.title).toEqual("AAA");
        expect(game.year).toEqual(2022);
        expect(game.developer).toEqual("AAA");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it("Test Error Not Found", (done) => {
    // supertest
    request(app)
      .get(`/games/${1001123123}`)
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        const { message } = response.body;

        expect(message).toBe("Error Not Found");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe("CREATE GAME", () => {
  it("Create Game", (done) => {
    request(app)
      .post(`/games`)
      .send({
        title: "DDD",
        developer: "DDD",
        year: 2020,
        genres: "Action RPG",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        const { message } = response.body;

        expect(message).toBe("Game created successfully");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe("DELETE GAME", () => {
  it("Delete Game", (done) => {
    request(app)
      .delete(`/games/${1003}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        const { message } = response.body;

        expect(message).toBe("Game deleted successfully");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
