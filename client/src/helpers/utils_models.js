class SiteMonitorModel {
	constructor(vals = {}) {
		this._siteName = vals?.siteName;
		this._siteURL = vals?.siteURL;
		this._intervalType = vals?.intervalType ?? "One Time";
		this._intervalFrequency = vals?.intervalFrequency;
		this._startDate = vals?.startDate ?? new Date();
		this._endDate = vals?.endDate ?? null; // if 'null', then no end date

		this._model = {
			siteName: "",
			siteURL: "",
			intervalType: "One Time",
			intervalFrequency: 15, // every mins (ie 15 or null)
			startDate: this._startDate,
			endDate: this._endDate,
		};
	}
	setProp(prop, val) {
		return (this._model[prop] = val);
	}
	getProp(prop) {
		return this._model[prop];
	}
	getModel() {
		return this._model;
	}
}

export { SiteMonitorModel };
