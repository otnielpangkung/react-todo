'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    activity: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    date: DataTypes.DATE,
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};