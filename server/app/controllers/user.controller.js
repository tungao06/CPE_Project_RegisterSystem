const db = require("../models");
const User = db.user;
const Role = db.role;

// TODO : GET ALL
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

// TODO : GET BY USERNAME
exports.getByUsername = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gpax: user.gpax,
        image: user.image,
        prefix: user.prefix,
        year: user.year,
        header: user.header,
        professional: user.professional,
        remain: user.remain,
        seat: user.seat,
        status: user.status
      });
    });
};

// TODO: PUT BY USERNAME
exports.putByUsername = (req, res) => {
  User.findOneAndUpdate({
    username: req.body.username
  },
    req.body
  )
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send(user);
    });
};