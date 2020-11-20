const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let User = require("../models/user.model");

// Get all users

router.route("/").get(function (req, res) {
    User.find().then(function (users) {
        res.json(users)
    })
});

// Find user by default Mongo ID

router.route("/id/:id").get(function (req, res) {
    User.findById(req.params.id)
        .then(function (user) {
            res.json(user);
        });
});

// Add a user

router.route("/add").post(function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const accountType = req.body.accountType;
    const newUser = new User({ username, password, firstName, lastName, accountType });

    newUser.save().then(function () {
        res.json("User added");
    });

});

// Log in

router.route("/login").post(function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const accountType = req.body.accountType;

    User.findOne({ username })
        .then(function (user) {
            if (!user) {
                return res.status(404).json(
                    { usernameNotFound: "User not found." }
                )
            }

            if (bcrypt.compareSync(password, user.password)) {
                const jwtPayload = {
                    id: user._id,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    accountType: user.accountType
                }
                jwt.sign(
                    jwtPayload,
                    "secret",
                    {
                        expiresIn: 31556926
                    },
                    function (err, token) {
                        res.json({
                            success: true,
                            accountType: accountType,
                            token: "Bearer " + token
                        })
                    }
                )
            } else {
                return res.status(400)
                    .json({
                        invalidPassword: "Invalid password."
                    });
            }
        });
})

module.exports = router;