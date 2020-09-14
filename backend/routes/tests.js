const router = require("express").Router();

let Test = require("../models/test.model");

router.route("/").get(function (req, res) {
    Test.find().then(function (tests) {
        res.json(tests)
    })
});

router.route("/add").post(function (req, res) {
    const name = req.body.name;
    const questionArray = req.body.questionArray;
    const type = req.body.type;
    const teacher = req.body.teacher;
    const student = req.body.student;
    const grade = req.body.grade;
    const newTest = new Test({ name, questionArray, type, teacher, student, grade });

    newTest.save().then(function () {
        res.json("Test added");
    });

});

module.exports = router;