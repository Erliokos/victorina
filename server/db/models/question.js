'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Theme, User}) {
      this.belongsTo(Theme,{foreignKey:'theme_id'});
      this.belongsToMany(User,{through:"Game",foreignKey:"que_id"});
    }
  };
  Question.init({
    que: DataTypes.TEXT,
    ans: DataTypes.TEXT,
    point: DataTypes.INTEGER,
    theme_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
