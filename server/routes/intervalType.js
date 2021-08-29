const express = require("express");
const router = express.Router();
// import query & handler
const { getAllIntervalTypes } = require("../connection/queries");

// get all 'intervalTypes' via the '/intervals' route
router.get("/", (req, res) => getAllIntervalTypes(req, res));

module.exports = router;
