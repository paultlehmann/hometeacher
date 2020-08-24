const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Backend server port
const port = 5000;

express().use(cors());
express().use(express.json());

// Connection to MongoDB
const uri = "mongodb+srv://testuser:test@users.kahfi.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
mongoose.connection.once("open", function() {
    console.log("Successfully connected to MongoDB");
})


express().listen(port, function() {
    console.log(`Server is running on port ${port}`);
});