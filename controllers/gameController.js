const { Game } = require("../models");

const findAll = async (req, res, next) => {
  try {
    const games = await Game.findAll();

    res.status(200).json(games);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await Game.findOne({
      where: {
        id,
      },
    });

    if (!game) {
      throw { name: "ErrorNotFound" };
    }
    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  findAll,
  findOne,
};
