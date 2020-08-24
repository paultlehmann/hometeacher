const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    accountType: {
        type: Number, // 0 = Teacher, 1 = Student, 2 = Parent
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;