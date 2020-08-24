const router = require("express").Router();

router.route("/").get(function (req, res) {
    console.log("you're here!");
});