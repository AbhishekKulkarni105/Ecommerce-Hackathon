
const { Sequelize, DataTypes, INTEGER, BelongsTo } = require("sequelize");
const dbConfig = require("../config/db.config");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql",
});
async function testDBConnectivity() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
//testDBConnectivity();
// exposing the database object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//config the models
db.product = require("./product.model")(sequelize); 
db.user = require("./user.model")(sequelize);
db.category = require("./category.model")(sequelize);

db.category.hasMany(db.product,{foreignKey:'categoryId'});
db.product.belongsTo(db.category,{foreignKey:'categoryId'});
module.exports = db;
