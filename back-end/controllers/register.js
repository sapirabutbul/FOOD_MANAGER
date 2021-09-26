const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../modules/db").db;
const secret = "supersecretstring";

const handleRegister = (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(404).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password, 10);
  db.transaction((trx) => {
    trx("login")
      .insert({
        hash: hash,
        email: email,
      })
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .insert({
            email: loginEmail[0],
            name: name,
          })
          .returning("*")
          .then((user) => {
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: "3h",
            });
            console.log("token", token);
            res.json({ user: user[0], token: token });
          });
      })
      .then(trx.commit)
      .catch((e) => {
        console.log("error in transaction:", e);
        trx.rollback;
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json("unable to register");
      });
  });
};
module.exports = {
  handleRegister,
};
