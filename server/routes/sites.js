const express = require("express");
const router = express.Router();
// import query & handler
const {
	getAllSites,
	getSiteByName,
	createSiteMonitor,
	updateSiteMonitor,
	disableSiteMonitor,
	enableSiteMonitor,
	deleteSiteMonitor,
} = require("../connection/queries");

/**
 * Base Route: "/sites"
 * - This means '/' really represents '/sites'
 * - This means '/add-site' really represents '/sites/add-site'
 */

// fetch all sites via '/sites' route
router.get("/", (req, res) => getAllSites(req, res));
// fetch specific site entry by site's name via '/sites/site?siteName=XXX' route
router.get("/site", (req, res) => getSiteByName(req, res));
// insert new site monitor entry via '/sites/add-site' route
router.post("/add-site", (req, res) => createSiteMonitor(req, res));
// update existing site monitor entry via '/sites/update-site' route
router.put("/update-site", (req, res) => updateSiteMonitor(req, res));
// disable site monitor via '/sites/disable-site' route
router.put("/disable-site", (req, res) => disableSiteMonitor(req, res));
// enable site monitor via '/sites/enable-site' route
router.put("/enable-site", (req, res) => enableSiteMonitor(req, res));
// delete site monitor via '/sites/delete-site'
router.delete("/delete-site", (req, res) => deleteSiteMonitor(req, res));

module.exports = router;
