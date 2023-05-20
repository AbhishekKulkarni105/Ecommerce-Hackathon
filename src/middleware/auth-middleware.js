const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const checkIfToBeSkipped = require("../utils/skip-urls.util");
module.exports = function (req, res, next) {
  // req : headers, body
  if(checkIfToBeSkipped(req)){
    //verification is not required
    next()
  } else {  
  console.log(req.headers.authorization); // bearer token is here
  try {
    const token = req.headers.authorization.split(" ")[1]; // [bearer,token]
    const decoded = jwt.verify(token, SECRET_KEY); // valid token
    console.log("DECODED TOKEN", decoded);
    // locals lifespan is only till current request
    res.locals.user = { id: decoded.subject, role: decoded.role }; // locals : local data

    next();
  } catch (err) {
    // invalid token
    return res.status(401).send({ message: "UNAUTHORIZED_REQUEST" });
  }
}
};
