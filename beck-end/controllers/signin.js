const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../modules/db").db;
const secret = "supersecretstring";

const handleSignIn = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db("login")
    .select("email", "hash")
    .where({ email })
    .then((data) => {
      console.log("data  :", data);
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where({ email })
          .then((user) => {
            //jsonwebtoken
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: "3h",
            });
            console.log("token", token);
            res.status(200).json({ user: user[0], token: token });
          })
          .catch((e) => {
            console.log(e);
            res.status(400).json("unable to get user");
          });
      } else {
        res.status(404).json("wrong password");
      }
    })
    .catch((e) => {
      res.status(404).json("wrong credential");
    });
};
module.exports = {
  handleSignIn,
};
