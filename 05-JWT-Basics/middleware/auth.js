var jwt = require("jsonwebtoken");
// const CustomAPIError = require("../errors/custom-error");


const {Unauthenticated} = require("../errors/index")

const {
  ReasonPhrases
} = require("http-status-codes");


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated(ReasonPhrases.UNAUTHORIZED);
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {username, id} = decoded 
    req.user = {username, id}
    next()
  } catch (error) {
    console.log(error);
    // next("can not access dashboard")
    throw new Unauthenticated(ReasonPhrases.UNAUTHORIZED);
  }
}

module.exports = authMiddleware