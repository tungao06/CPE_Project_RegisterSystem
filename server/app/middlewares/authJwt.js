const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Teacher = db.teacher;
const Admin = db.admin;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  Admin.findById(req.adminId).exec((err, admin) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: admin.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isTeacher = (req, res, next) => {
  Teacher.findById(req.userId).exec((err, teacher) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    try {
      Role.find(
        {
          _id: { $in: teacher.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "teacher") {
              next();
              return;
            }
          }

          res.status(403).send({ message: "Require Teacher Role!" });
          return;
        }
      );
    }
    catch (err) {
      res.status(404).send({ message: "Don't have Teacher account!" });
    }

  });
};

isUser = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "user") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require User Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isTeacher,
  isUser
};
module.exports = authJwt;