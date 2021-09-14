const jwt = require("jsonwebtoken");
const secret = "supersecretstring";

const withAuth = (req, res, next) => {
  const token = req.body.token;

  console.log("req.body.token", req.body.token);
  if (!token) {
    res.status(401).send("Unauthorized: no token provided");
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: invalid token");
      } else {
        console.log("email", decoded.email);
        next();
      }
    });
  }
};
module.exports = {
  withAuth,
};
