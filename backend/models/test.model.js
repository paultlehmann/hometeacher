const { Question } = require("./question.model");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    questionArray: {
        type: Array
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
    },
    internalID: {
        type: Number
    },
    guesses: {
        type: Object
    },
    scores: {
        type: Object
    }, 
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;