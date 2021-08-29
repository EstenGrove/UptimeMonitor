const express = require("express");
const router = express.Router();
// import query & handler
const { getAllIntervalOptions } = require("../connection/queries");

// get all 'intervalFrequencies' via the '/frequency' route
router.get("/", (req, res) => getAllIntervalOptions(req, res));

module.exports = router;
