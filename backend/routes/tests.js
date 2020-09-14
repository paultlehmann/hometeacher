const router = require("express").Router();

let Test = require("../models/test.model");

// Display all tests

router.route("/").get(function (req, res) {
    Test.find().then(function (tests) {
        res.json(tests);
    });
});

// Add a test

router.route("/add").post(function (req, res) {
    const name = req.body.name;
    const questionArray = req.body.questionArray;
    const type = req.body.type;
    const teacher = req.body.teacher;
    const student = req.body.student;
    const isComplete = req.body.isComplete;
    const grade = req.body.grade;
    const newTest = new Test({ name, questionArray, type, teacher, student, isComplete, grade });

    newTest.save().then(function () {
        res.json("Test added");
    });

});

// Find test by ID

router.route("/id/:id").get(function (req, res) {
    Test.findById(req.params.id)
    .then(function (test) {
        res.json(test);
    });
});

// Delete a test by ID

router.route("/id/:id").delete(function (req, res) {
    Test.findByIdAndDelete(req.params.id)
    .then(function() {
        res.json("Test deleted.");
    });
});

// Update a test by ID

router.route("/id/:id").post(function (req, res) {
    Test.findById(req.params.id)
    .then(function (test) {
        test.name = req.body.name;
        test.questionArray = req.body.questionArray;
        test.type = req.body.type;
        test.teacher = req.body.teacher;
        test.student = req.body.student;
        test.isComplete = req.body.isComplete;
        test.grade = req.body.grade;

        test.save()
        .then(function () {
            res.json("Test updated.");
        });
    });
});

module.exports = router;