const express = require("express");
const router = express.Router();

const {
	getAllHistoricalSiteChecks,
	getSiteChecksByRows,
	getAllSiteChecksBySite,
} = require("../connection/queries");

/**
 * Base Route: "/history"
 * - This means '/' really represents '/history'
 * - This means '/partial' really represents '/history/partial'
 */

// fetches all historical site_checks' records via '/history'
router.get("/", (req, res) => getAllHistoricalSiteChecks(req, res));
// fetches XX number of site_checks via '/history/partial'
router.get("/partial", (req, res) => getSiteChecksByRows(req, res));
// fetches site_checks for a single site via '/history/site'
router.get("/site", (req, res) => getAllSiteChecksBySite(req, res));

module.exports = router;
