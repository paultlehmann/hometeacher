const express = require("express");
const cors = require("cors");

// const app = express();
const port = 5000;

express().use(cors());
express().use(express.json());

express().listen(port, function() {
    console.log(`Server is running on port ${port}`);
});