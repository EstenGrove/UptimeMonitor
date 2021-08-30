import { frequency, intervals, monitor } from "./utils_endpoints";
import { currentEnv } from "./utils_env";
import { genericGet } from "./utils_generic";
import {
	normaliseTableData,
	formatFreqType,
	formatIntervalType,
} from "./utils_processing";

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

export { getAllSiteMonitors, getFrequencyOptions, getIntervalTypes };

export { getIntervalDeps };
