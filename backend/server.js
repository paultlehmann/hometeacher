const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Backend server port
const port = 5000;

app.use(cors());
app.use(express.json());

// Connection to MongoDB
const uri = "mongodb+srv://testuser:test@users.kahfi.mongodb.net/hometeacher?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
mongoose.connection.once("open", function() {
    console.log("Successfully connected to MongoDB");
})

// Routers
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});