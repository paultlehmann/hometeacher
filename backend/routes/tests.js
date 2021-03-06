const router = require("express").Router();

let Test = require("../models/test.model");

// Display all tests

router.route("/").get(function (req, res) {
    Test.find().then(function (tests) {
        res.json(tests);
    });
});

// Add a test

router.route("/add").post(async function (req, res) {

    const name = req.body.name;
    const questionArray = req.body.questionArray;
    const testType = req.body.testType;
    const teacher = req.body.teacher;
    const student = req.body.student;
    const isComplete = req.body.isComplete;
    const grade = req.body.grade;
    const internalID = req.body.internalID;
    const guesses = req.body.guesses;
    const scores = req.body.scores;

    const newTest = new Test({ name, questionArray, testType, teacher, student, isComplete, grade, internalID, guesses, scores });

    newTest.save().then(function () {
        res.json("Test added");
    });
    console.log(`Test added to MongoDB - ID #${newTest.internalID}`);

});

// Find a test by internal ID

router.route("/id/:internalID").get(function (req, res) {

    const searchResult = Test.findOne({ internalID: req.params.internalID });

    searchResult.select("name internalID questionArray testType teacher student isComplete grade");

    searchResult.exec(function (err, test) {
        res.json(test);
    })
})

// Delete a test by internal ID

router.route("/id/:internalID").delete(function (req, res) {

    const searchResult = Test.findOne({ internalID: req.params.internalID });

    searchResult.select("name internalID questionArray testType teacher student isComplete grade");

    searchResult.exec(function (err, test) {
        test.remove();
        res.json("Test deleted.");
    })
})

// Find test by default Mongo ID

router.route("/mongoid/:id").get(function (req, res) {
    Test.findById(req.params.id)
        .then(function (test) {
            res.json(test);
        });
});

// Update a test's questions by internal ID

router.route("/id/:internalID").put(function (req, res) {
    const searchResult = Test.findOne({ internalID: req.params.internalID });

    searchResult.select("name internalID questionArray testType teacher student isComplete grade guesses");
    searchResult.exec(function (err, data) {
        data.questionArray.push(req.body);
        console.log(data.questionArray);
        data.save();
        res.json("Test questions edited");
    });
});

// Add a grade to a test by internal ID

router.route("/grade/:internalID").put(function (req, res) {
    const searchResult = Test.findOne({ internalID: req.params.internalID });

    searchResult.select("name internalID questionArray testType teacher student isComplete grade guesses");
    searchResult.exec(function (err, data) {
        console.log(data);
    });
});

module.exports = router;