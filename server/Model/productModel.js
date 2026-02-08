import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    productDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },

    productCategory: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "products",
    freezeTableName: true,
    timestamps: true
  }
);
