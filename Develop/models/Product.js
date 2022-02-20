// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    type: DataTypes.STRING,
    allowNull: false
  },
  {
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      isDecimal: true
    }
  },
  {
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      isNumber: true
    }
  },
  {
    category_id: {
      type: DataTypes.INTEGER,
      //TODO: ref Category model id
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
