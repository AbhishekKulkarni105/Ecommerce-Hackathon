
const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define("Category", {
    categoryId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    categoryDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    categoryStatus: {
        type: DataTypes.ENUM,
        values: ["active", "inactive"],
        defaultValue: "active",
        validate: {
          isIn: [["active", "inactive"]],
        },
      },    
  },);
};
