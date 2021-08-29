// table & db info
const dbModels = require("../models/models");
const { dbName, tableNames } = dbModels;

const Pool = require("pg").Pool;

const pool = new Pool({
	user: "estengrove",
	host: "localhost",
	database: dbName,
	password: "Tripper99",
	port: 5432,
});

module.exports = {
	Pool,
	pool,
};
