const express = require("express");
const router = express.Router();
// import query & handler

// checks status of server

// get all '/api' via the '/api' route
router.get("/", (req, res) => {
	return res.json({
		status: "Ok",
		message: "App is online!",
	});
});

module.exports = router;
