const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
// import route modules (mini-apps)
const sitesModule = require("./routes/sites");
const siteCheckModule = require("./routes/siteCheck");
const intervalModule = require("./routes/intervalType");
const freqModule = require("./routes/intervalFrequency");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// declare routes for each route module
app.use("/sites", sitesModule);
app.use("/history", siteCheckModule);
app.use("/intervals", intervalModule);
app.use("/frequency", freqModule);

app.listen(port, (err) => {
	if (err) throw err;
	console.log(`✅ Server is running on port ${port}!!`);
});
