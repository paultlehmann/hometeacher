const router = require("express").Router();

let Question = require("../models/question.model");

// Display all questions

router.route("/").get(function (req, res) {
    Question.find().then(function (questions) {
        res.json(questions)
    })
});

// Add a question

router.route("/add").post(function (req, res) {
    const prompt = req.body.prompt;
    const rightAnswer = req.body.rightAnswer;
    const wrongAnswers = req.body.wrongAnswers;
    const newQuestion = new Question({ prompt, rightAnswer, wrongAnswers });

    newQuestion.save().then(function () {
        res.json("Question added.");
    });

});

// Delete a question by ID

router.route("/id/:id").delete(function (req, res) {
    Question.findByIdAndDelete(req.params.id)
    .then(function() {
        res.json("Question deleted.");
    });
});

module.exports = router;