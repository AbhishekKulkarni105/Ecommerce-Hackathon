const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define("Product", {
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    packSize: {
      type: DataTypes.STRING,
      defaultValue: 0.0,
    },
    productPrice: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    productImage: {
      type: DataTypes.STRING,
    },
    productStatus: {
      type: DataTypes.ENUM,
      values: ["active", "inactive"],
      defaultValue: "active",
      validate: {
        isIn: [["active", "inactive"]],
      },
    }
  });
};
