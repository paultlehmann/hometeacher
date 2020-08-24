const router = require("express").Router();

let User = require("../models/user.model");

router.route("/").get(function(req, res) {
    User.find().then(function(users) {
        res.json(users)
    })
});

router.route("/add").post(function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const accountType = req.body.accountType;
    const newUser = new User({username, password, firstName, lastName, accountType});

    newUser.save().then(function() {
        res.json("User added");
    });
});

module.exports = router;