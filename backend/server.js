const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

const Users = require("./routes/users");

const app = express();

// Backend server port
const port = 5000;

app.use(cors());
app.use(express.json());

// Connection to MongoDB
const uri = "mongodb+srv://testuser:test@users.kahfi.mongodb.net/hometeacher?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.once("open", function () {
    console.log("Successfully connected to MongoDB");
})

// Passport middleware & config
app.use(passport.initialize());

require("./config/passport") (passport);

// Routers
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const testsRouter = require("./routes/tests");
app.use("/tests", testsRouter);

const questionsRouter = require("./routes/questions");
app.use("/questions", questionsRouter);

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});