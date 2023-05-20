// imports
require("./src/error-handler");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require('cors')
const PORT_NUMBER = 8081;
const db = require("./src/models");
const { productRouter,orderRouter, userRouter ,categoryRouter} = require("./src/routes");
//const logMiddleware = require("./src/middleware/log-middleware");
const authMiddleware = require("./src/middleware/auth-middleware");
const rateLimit = require("express-rate-limit");
const Category = require("./src/models/category.model");
const Product = require("./src/models/product.model");
// APP setup
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests",
});

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(authMiddleware);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/product',productRouter);
app.use('/api/category',categoryRouter);
app.use('/api/auth',userRouter);




db.sequelize.sync({force: true});

// START SERVER
app.listen(PORT_NUMBER,(err) => {
  if (err) throw err;
  else console.log(`Server started at http://localhost:${PORT_NUMBER}`);
});
