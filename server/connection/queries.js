// table & db info
const dbModels = require("../models/models");
const { dbName, tableNames } = dbModels;

// db connection pool
const connection = require("./connection");
const { Pool, pool } = connection;

// const Pool = require("pg").Pool;

// const pool = new Pool({
// 	user: "estengrove",
// 	host: "localhost",
// 	database: dbName,
// 	password: "Tripper99",
// 	port: 5432,
// });

// GENERIC QUERY UTILS //

// fetches all rows from a table by table name
const getAllFromTable = (tableName, req, res) => {
	pool.query(`SELECT * FROM ${tableName} ORDER BY id ASC`, (err, results) => {
		if (err) throw err;

		return res.json(results.rows);
	});
};
// fetches all interval types
const getAllIntervalTypes = (req, res) => {
	pool.query("SELECT * FROM interval_types ORDER BY id ASC", (err, results) => {
		if (err) throw err;

		return res.json(results.rows);
	});
};
// fetches all interval frequency options (eg 30, 60 etc).
const getAllIntervalOptions = (req, res) => {
	pool.query(
		"SELECT * FROM interval_frequencies ORDER BY id ASC",
		(err, results) => {
			if (err) throw err;

			return res.json(results.rows);
		}
	);
};
// fetch ALL historical site_checks records
const getAllHistoricalSiteChecks = (req, res) => {
	pool.query("SELECT * FROM site_checks ORDER BY id ASC", (err, results) => {
		return res.json(results.rows);
	});
};
// fetch XX number of site_checks table records
const getSiteChecksByRows = (req, res) => {
	let { index = 0, rows = 100 } = req.query;
	// convert to numbers
	index = +index;
	rows = +rows;

	pool.query(
		`SELECT * FROM site_checks ORDER BY id ASC LIMIT ${rows}`,
		(err, results) => {
			return res.json(results?.rows ?? []);
		}
	);
};
// fetch XX number of site_checks table records
const getAllSiteChecksBySite = (req, res) => {
	const id = parseInt(req.query.id);

	pool.query(
		`SELECT * FROM site_checks WHERE id = $1`,
		[id],
		(err, results) => {
			return res.json(results.rows);
		}
	);
};

// fetches all sites from 'sites' table (GET)
const getAllSites = (req, res) => {
	pool.query("SELECT * FROM sites ORDER BY id ASC", (err, results) => {
		if (err) throw err;

		return res.json(results.rows);
	});
};
// fetches a single site by 'name' column (GET)
const getSiteByName = (req, res) => {
	const { siteName } = req.query;

	pool.query(
		"SELECT * FROM sites WHERE name = $1",
		[siteName],
		(err, results) => {
			if (err) throw err;

			return res.json(results?.rows ?? "No match found :(");
		}
	);
};
// create a new 'site' entry (POST)
const createSiteMonitor = (req, res) => {
	const {
		name,
		url,
		intervalType: type,
		intervalFrequency: freq,
		startDate = null,
		endDate = null,
	} = req.body;

	pool.query(
		"INSERT INTO sites (name, url, interval_type, interval_frequency, start_date, end_date) VALUES($1, $2, $3, $4, $5, $6)",
		[name, url, type, freq, startDate, endDate],
		(err, result) => {
			if (err) throw err;

			// maybe change to res.status(201).send(...)
			return res.status(201).json({
				status: `Success`,
				message: `New site monitor added with ID: ${result.insertId}`,
			});
		}
	);
};
// update an existing 'site' entry ('PUT')
const updateSiteMonitor = (req, res) => {
	const id = parseInt(req.query.id);
	const {
		siteName,
		siteUrl,
		intervalTypeID: typeID,
		intervalFrequencyID: freqID,
		startDate,
		endDate,
		contactEmail,
		isContactEnabled,
		isActive,
	} = req.body;

	pool.query(
		"UPDATE sites SET name = $1, url = $2, interval_type_id = $3, interval_frequency_id = $4, start_date = $5, end_date = $6, contact_email = $7, contact_enabled = $8, is_active = $9 WHERE id = $10",
		[
			siteName,
			siteUrl,
			typeID,
			freqID,
			startDate,
			endDate,
			contactEmail,
			isContactEnabled,
			isActive,
			id,
		],
		(err, results) => {
			if (err) throw err;

			return res.json({
				status: "Success",
				message: `Site ${id} was updated successfully!`,
			});
		}
	);
};
// disables an existing 'site' entry, but keeps the record.
const disableSiteMonitor = (req, res) => {
	const id = parseInt(req.query.id);

	pool.query(
		"UPDATE sites SET is_active = false WHERE id = $1",
		[id],
		(err, results) => {
			if (err) throw err;

			return res.json({
				status: "Success",
				message: `Site ${id} was disabled successfully!`,
			});
		}
	);
};
// enables an existing 'site' entry, but keeps the record.
const enableSiteMonitor = (req, res) => {
	const id = parseInt(req.query.id);

	pool.query(
		"UPDATE sites SET is_active = true WHERE id = $1",
		[id],
		(err, results) => {
			if (err) throw err;

			return res.json({
				status: "Success",
				message: `Site ${id} was re-enabled successfully!`,
			});
		}
	);
};
// deletes a 'site' entry entirely
const deleteSiteMonitor = (req, res) => {
	const id = parseInt(req.query.id);

	pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		res.json({
			status: "Success",
			message: `Site monitor ${id} was deleted successfully!`,
		});
	});
};

module.exports = {
	getAllFromTable,
	getAllIntervalTypes,
	getAllIntervalOptions,
	getAllHistoricalSiteChecks,
	getSiteChecksByRows,
	getAllSiteChecksBySite,
	getAllSites,
	getSiteByName,
	createSiteMonitor,
	updateSiteMonitor,
	disableSiteMonitor,
	enableSiteMonitor,
	deleteSiteMonitor,
};
