const { Question } = require("./question.model");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    questionArray: {
        type: [String]
    },
    testType: {
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