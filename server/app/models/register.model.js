const mongoose = require("mongoose");

const Register = mongoose.model(
    "Register",
    new mongoose.Schema({
        year: { type: Number },
        status: { type: Boolean },
        remain: { type: String },
        seat: { type: String },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        teachers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teacher"
            }
        ],
        // scount: { type: Number },
        // tcount: { type: Number },
    },
        {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        }
    )
);
module.exports = Register;