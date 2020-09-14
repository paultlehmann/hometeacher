let Question = require("./question.model");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    questionArray: {
        // TODO: Make this an array of Questions
        type: [String],
        required: true
    },
    type: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    student: {
        type: String
    },
    isComplete: {
        type: Boolean
    },
    grade: {
        type: Number
    }
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;