// const { Game } = require("../models");

// const findAll = async (req, res, next) => {
//   try {
//     const games = await Game.findAll();

//     res.status(200).json(games);
//   } catch (err) {
//     next(err);
//   }
// };

// const findOne = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const game = await Game.findOne({
//       where: {
//         id,
//       },
//     });

//     if (!game) {
//       throw { name: "ErrorNotFound" };
//     }
//     res.status(200).json(game);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = {
//   findAll,
//   findOne,
// };

const { Games } = require("../models");

exports.findAll = async (req, res, next) => {
  try {
    const games = await Games.findAll();
    res.status(200).json(games);
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const game = await Games.findByPk(req.params.id);
    if (game) {
      res.status(200).json(game);
    } else {
      const error = new Error("Game Not Found");
      error.name = "ErrorNotFound";
      throw error; // Throw error with custom name
    }
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
};
