const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define("User", {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
      isEmail:true,
      }
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userContact: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
      is: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/i,
      }
    },
    userRole: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      defaultValue: "user",
      validate:{
      isIn:[["admin","user"]],
      }
    },
    userStatus: {
        type: DataTypes.ENUM,
        values: ["active", "inactive"],
        defaultValue: "active",
        validate: {
          isIn: [["active", "inactive"]],
        },
      },
  });
};
