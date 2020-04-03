const db = require("../models");
const Teacher = db.teacher;
const Role = db.role;

// TODO : GET ALL ROLES
exports.allRole = (req, res) => {
  Teacher.find({})
    .exec((err, teacher) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!teacher) {
        return res.status(404).send({ message: "Teacher Not found." });
      }

      res.status(200).send(teacher);
    });
};

// TODO : GET BY Username
exports.getByUsername = (req, res) => {
  Teacher.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, teacher) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!teacher) {
        return res.status(404).send({ message: "Teacher Not found." });
      }

      res.status(200).send({
        id: teacher._id,
        username: teacher.username,
        email: teacher.email,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        image: teacher.image,
        prefix: teacher.prefix,
        year: teacher.year,
        header: teacher.header,
        professional: teacher.professional
      });
    });
};

// TODO: PUT BY Username
exports.putByUsername = (req, res) => {
  Teacher.findOneAndUpdate({
    username: req.body.username
  },
    req.body
  )
    .exec((err, teacher) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!teacher) {
        return res.status(404).send({ message: "Teacher Not found." });
      }
      res.status(200).send(teacher);
    });
};

// TODO: DELETE BY Username
exports.deleteByUsername = (req, res) => {
  Teacher.findOneAndDelete({
    username: req.body.username
  })
    .exec((err, teacher) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!teacher) {
        return res.status(404).send({ message: "Teacher Not found." });
      }
      res.status(200).send(teacher);
    });
};