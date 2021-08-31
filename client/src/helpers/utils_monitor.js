import { frequency, intervals, monitor, status } from "./utils_endpoints";
import { currentEnv } from "./utils_env";
import { genericGet } from "./utils_generic";
import {
	normaliseTableData,
	formatFreqType,
	formatIntervalType,
	formatSiteCheck,
} from "./utils_processing";
import { isEmptyArray } from "./utils_types";

// retrieves all site records
const getAllSiteMonitors = async () => {
	let url = currentEnv.base + monitor.get.allSites;
	const resp = await genericGet(url);
	return resp;
};
// fetches all interval types
const getIntervalTypes = async () => {
	let url = currentEnv.base + intervals.get.allTypes;
	const resp = await genericGet(url);
	return resp;
};
// fetches all interval frequency options
const getFrequencyOptions = async () => {
	let url = currentEnv.base + frequency.get.allTypes;
	const resp = await genericGet(url);
	return resp;
};
// fetches a single site's current check status
const getCurrentStatusBySite = async (siteID) => {
	let url = currentEnv.base + status.get.bySite;
	const resp = await genericGet(url, {
		siteID: siteID,
	});

	console.log(`Status:`, resp);
	return resp;
};

// COMBINED/MERGED REQUEST UTILS //

/**
 * Fetches a site's current status record.
 * @param {Number} siteID - A site's "site_id" identifier
 * @returns {Object} - Returns the site's "site_check" record if it exists.
 */
const getFormattedStatusBySite = async (siteID) => {
	const statusList = await getCurrentStatusBySite(siteID);

	if (!isEmptyArray(statusList)) {
		const normalised = normaliseTableData(statusList, formatSiteCheck);
		return normalised?.[0];
	} else {
		return {};
	}
};

// fetches data & normalises for client
const getIntervalDeps = async () => {
	const [intervals, frequencies] = await Promise.all([
		getIntervalTypes(),
		getFrequencyOptions(),
	]);

	// format/normalise data for client
	const intervalTypes = normaliseTableData(intervals, formatIntervalType);
	const frequencyTypes = normaliseTableData(frequencies, formatFreqType);

	return {
		intervalTypes,
		frequencyTypes,
	};
};

export {
	getAllSiteMonitors,
	getFrequencyOptions,
	getIntervalTypes,
	getCurrentStatusBySite,
};

export { getIntervalDeps, getFormattedStatusBySite };
