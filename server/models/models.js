const format = require("date-fns/format");

const dbName = "site_monitors";

const tableNames = {
	sites: "sites",
	siteChecks: "site_checks",
	intervalTypes: "interval_types",
	intervalFrequencies: "interval_frequencies",
};

// SERVER & DATABASE MODELS //

/**
 * 'SiteMonitor' entry (server/database):
 * - This model represent a single website to be pinged & it's settings.
 */
class SiteServerModel {
	constructor(site = {}) {
		this._siteName = site?.siteName;
		this._siteUrl = site?.siteUrl;
		this._intervalTypeID = site?.intervalTypeID;
		this._intervalFrequencyID = site?.intervalFrequencyID;
		this._startDate = site?.startDate;
		this._endDate = site?.endDate;
		this._contactEmail = site?.contactEmail;
		this._isContactEnabled = site?.isContactEnabled ?? false;
		this._isActive = site?.isActive ?? true;

		this._model = {
			name: this._siteName,
			url: this._siteUrl,
			interval_type_id: this._intervalTypeID,
			interval_frequency_id: this._intervalFrequencyID,
			start_date: this._startDate,
			end_date: this._endDate,
			contact_email: this._contactEmail,
			contact_enabled: this._isContactEnabled,
			is_active: this._isActive,
		};
	}
	getModel() {
		return this._model;
	}
}
/**
 * 'site_checks' entry model:
 * - Represents a client-side record of a ping attempt
 */
class SiteCheckServerModel {
	constructor(vals = {}) {
		this._siteID = vals?.siteID ?? 0;
		this._dateCreated =
			format(vals?.dateCreated, "YYYY-MM-DD") ??
			format(new Date(), "YYYY-MM-DD");
		this._responseTime = vals?.responseTime ?? 0;
		this._statusInfo = vals?.statusInfo ?? null;
		this._wasSuccessful = vals?.wasSuccessful ?? false;

		this._model = {
			id: this._siteID, // from 'sites' table
			date_created: this._dateCreated, // needs formatting
			response_time: this._responseTime,
			status_info: this._statusInfo,
			was_successful: this._wasSuccessful,
		};
	}
	getModel() {
		return this._model;
	}
}
/**
 * 'IntervalTypes' model (server/database):
 * - Represents an entry in the 'interval_types' table.
 */
class IntervalTypeServerModel {
	constructor(vals = {}) {
		this._id = vals?.intervalTypeID;
		this._name = vals?.intervalName;
		this._description = vals?.intervalDesc;
		this._isActive = vals?.isActive;

		this._model = {
			id: this._id,
			name: this._name,
			description: this._description,
			is_active: this._isActive,
		};
	}
	getModel() {
		return this._model;
	}
}
/**
 * 'IntervalFrequency' model (server/database):
 * - Represents an entry in the 'interval_frequencies' table.
 */
class IntervalFrequencyServerModel {
	constructor(vals = {}) {
		this._id = vals?.intervalTypeID;
		this._frequency = vals?.intervalFrequency;
		this._description = vals?.frequencyDesc;
		this._isActive = vals?.isActive;

		this._model = {
			id: this._id,
			frequency: this._name,
			description: this._description,
			is_active: this._isActive,
		};
	}
	getModel() {
		return this._model;
	}
}

module.exports = {
	tableNames,
	dbName,
	// server/database models
	SiteServerModel,
	SiteCheckServerModel,
	IntervalTypeServerModel,
	IntervalFrequencyServerModel,
};
