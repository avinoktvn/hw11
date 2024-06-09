// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Game extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Game.init(
//     {
//       title: DataTypes.STRING,
//       developer: DataTypes.STRING,
//       year: DataTypes.INTEGER,
//       genres: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "Game",
//     }
//   );
//   return Game;
// };

"use strict";
module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define(
    "Games",
    {
      title: DataTypes.STRING,
      developer: DataTypes.STRING,
      genres: DataTypes.STRING,
      year: DataTypes.INTEGER,
    },
    {}
  );
  Games.associate = function (models) {
    // associations can be defined here
  };
  return Games;
};
