const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    prompt: {
        type: String,
        required: true,
    },
    rightAnswer: {
        type: String,
        required: true,
    },
    wrongAnswers: {
        type: [String],
        required: true
    },
    guess: {
        type: String
    }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;