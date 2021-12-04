'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      
    }
  };
  Game.init({
    user_id: DataTypes.INTEGER,
    que_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
