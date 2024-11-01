'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.Employee, { foreignKey: 'employee_id', as: 'employee' });
    }
  }

  Account.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass_word: {
      type: DataTypes.STRING,
      allowNull: false
    },
    employee_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts',
    timestamps: true
  });

  return Account;
};
