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

exports.findAll = async (req, res) => {
  try {
    const games = await Games.findAll();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const game = await Games.findByPk(req.params.id);
    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: "Game Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
