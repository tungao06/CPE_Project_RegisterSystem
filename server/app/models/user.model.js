const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    timestamps: { type: Date, default: Date.now },
    gpax: { type: Number },
    image: { type: String },
    prefix: { type: String },
    year: { type: Number },
    head: { type: String},
    professional: { type: String },
    remain: { type: String },
    seat: { type: String },
    status: { type: String },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;