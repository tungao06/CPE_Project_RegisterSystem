const db = require("../models");
const Admin = db.admin;
const Role = db.role;

// TODO : GET ALL ROLES
exports.allRole = (req, res) => {
  Admin.find({})
    .exec((err, admin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!admin) {
        return res.status(404).send({ message: "admin Not found." });
      }

      res.status(200).send(admin);
    });
};

// TODO : GET BY Username
exports.getByUsername = (req, res) => {
  Admin.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, admin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!admin) {
        return res.status(404).send({ message: "Admin Not found." });
      }

      res.status(200).send({
        id: admin._id,
        email: admin.email,
        username: admin.username
      });
    });
};

// TODO: PUT BY Username
exports.putByUsername = (req, res) => {
    Admin.findOneAndUpdate({
        username: req.body.username
  },
    req.body
  )
    .exec((err, admin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!admin) {
        return res.status(404).send({ message: "Admin Not found." });
      }
      res.status(200).send(admin);
    });
};