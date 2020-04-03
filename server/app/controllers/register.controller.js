const db = require("../models");
const Register = db.register;
const Role = db.role;

// TODO : GET ALL
exports.allRegister = (req, res) => {
    Register.find({})
        .exec((err, register) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!register) {
                return res.status(404).send({ message: "Register Not found." });
            }

            res.status(200).send(register);
        });
};

// TODO : GET BY YEAR
exports.getByYear = (req, res) => {
    Register.find({
        year: req.body.year
    })
        .exec((err, register) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!register) {
                return res.status(404).send({ message: "Register Not found." });
            }

            res.status(200).send(register);
        });
};

// TODO : POST REGISTER
exports.postRegister = (req, res) => {
    var register = new Register({
        year: req.body.year,
        status: req.body.status,
        remain: req.body.remain,
        seat: req.body.seat,
        users: [req.body.users],
        teachers: [req.body.teachers]
    })
    register.save((err, register) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!register) {
            return res.status(404).send({ message: "Register Not found." });
        }

        res.status(200).send(register);
    });
};


// TODO: PUT BY YEAR
exports.putByYear = (req, res) => {
    Register.findOneAndUpdate({
        teachers: req.body.teachers
    },
        req.body
    )
        .exec((err, register) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!register) {
                return res.status(404).send({ message: "Not found." });
            }
            res.status(200).send(register);
        });
};