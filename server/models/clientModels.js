const format = require("date-fns/format");

/**
 * 'SiteMonitor' entry (client-side):
 * - This model represent a single website to be pinged & it's settings.
 */
class SiteClientModel {
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
			siteName: this._siteName,
			siteUrl: this._siteUrl,
			intervalTypeID: this._intervalTypeID,
			intervalFrequencyID: this._intervalFrequencyID,
			startDate: this._startDate,
			endDate: this._endDate,
			contactEmail: this._contactEmail,
			isContactEnabled: this._isContactEnabled,
			isActive: this._isActive,
		};
	}
	getModel() {
		return this._model;
	}
}
/**
 * 'site_checks' entry model (client-side):
 * - Represents a client-side record of a ping attempt
 */
class SiteCheckClientModel {
	constructor(vals = {}) {
		this._siteID = vals?.siteID ?? 0;
		this._dateCreated =
			format(vals?.dateCreated, "YYYY-MM-DD") ??
			format(new Date(), "YYYY-MM-DD");
		this._responseTime = vals?.responseTime ?? 0;
		this._statusInfo = vals?.statusInfo ?? null;
		this._wasSuccessful = vals?.wasSuccessful ?? false;

		this._model = {
			siteID: this._siteID, // from 'sites' table
			dateCreated: this._dateCreated, // needs formatting
			responseTime: this._responseTime,
			statusInfo: this._statusInfo,
			wasSuccessful: this._wasSuccessful,
		};
	}
	getModel() {
		return this._model;
	}
}
/**
 * 'IntervalTypes' model (client-side):
 * - Represents an entry in the 'interval_types' table.
 */
class IntervalTypeClientModel {
	constructor(vals = {}) {
		this._id = vals?.intervalTypeID;
		this._name = vals?.intervalName;
		this._description = vals?.intervalDesc;
		this._isActive = vals?.isActive;

		this._model = {
			intervalTypeID: this._id,
			intervalType: this._name,
			desc: this._description,
			isActive: this._isActive,
		};
	}
	getModel() {
		return this._model;
	}
}
/**
 * 'IntervalFrequency' model (client-side):
 * - Represents an entry in the 'interval_frequencies' table.
 */
class IntervalFrequencyClientModel {
	constructor(vals = {}) {
		this._id = vals?.intervalTypeID;
		this._frequency = vals?.intervalFrequency;
		this._description = vals?.frequencyDesc;
		this._isActive = vals?.isActive;

		this._model = {
			id: this._id,
			frequency: this._name,
			description: this._description,
			isActive: this._isActive,
		};
	}
	getModel() {
		return this._model;
	}
}

module.exports = {
	SiteClientModel,
	SiteCheckClientModel,
	IntervalTypeClientModel,
	IntervalFrequencyClientModel,
};
