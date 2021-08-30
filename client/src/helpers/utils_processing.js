import { trimMinuteDesc } from "./utils_dates";
import { isEmptyVal } from "./utils_types";

const enforceStrMaxLength = (str, maxLength = 30) => {
	if (str.length < maxLength) return str;
	return str.slice(0, maxLength);
};

const addEllipsis = (str, maxLength = 30) => {
	if (isEmptyVal(str)) return ``;
	if (str.length < maxLength) return str;
	const managedStr = enforceStrMaxLength(str, maxLength);
	return managedStr + "...";
};

const range = (start, stop, callback) => {
	return Array.from({ length: stop - start }, (_, i) => callback(i + start));
};

// converts num to letter (MUST BE WITHIN RANGE: 97-122 A-Za-z)
const numToLetter = (num) => {
	const letter = String.fromCharCode(num);
	return letter;
};
// gets a 'random' number within a range
const numInRange = (min = 97, max = 122) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// TRIM URL STRING TO FIT INTO CONTAINER SIZE LIMITS

const trimUrl = (urlString, maxLength = 40) => {
	const { length } = urlString;
	// return url if short
	if (length <= maxLength) return urlString;
	// slice long url & add '...' to the end
	const anchor = maxLength - 3;
	const prefix = urlString.slice(0, anchor);
	const suffix = urlString.slice(anchor, -1);
	const merged = prefix + "..." + suffix;

	return addEllipsis(merged);
};

// count: how many 'random chars' to generate
// used for ids in <ReassessReport/>
const generateID = (count = 6) => {
	const baseCount = range(1, count, (x) => x + 1);
	const random = baseCount
		.map((x) => {
			const inRange = numInRange();
			return numToLetter(inRange);
		})
		.join("");
	return count + random;
};

// creates a unique ID, w/ a 'timestamp' of when it was created
const generateUID = (idLength = 32) => {
	const x1 = generateID(idLength);
	return `${x1}=${Date.now()}`;
};

// FORMATTING UTILS: CLIENT-SIDE FORMATTING //

// formats 'interval_type' record
const formatIntervalType = (record = {}) => {
	const { id, name, description: desc, is_active: isActive } = record;

	return {
		intervalTypeID: id,
		name: name,
		desc: desc,
		isActive: isActive,
	};
};
// formats 'interval_frequencies' record
const formatFreqType = (record = {}) => {
	const { id, frequency, description: desc, is_active: isActive } = record;

	return {
		frequencyTypeID: id,
		frequencyType: frequency,
		desc: desc,
		isActive: isActive,
	};
};
// formats 'sites' record
const formatSiteMonitor = (record = {}) => {
	const {
		id,
		name: siteName,
		url,
		interval_type_id: intervalID,
		interval_frequency_id: frequencyID,
		start_date: startDate,
		end_date: endDate,
		contact_email: contactEmail,
		contact_enabled: isContactEnabled,
		is_active: isActive,
	} = record;

	return {
		siteID: id,
		siteName: siteName,
		siteUrl: url,
		intervalID: intervalID,
		frequencyID: frequencyID,
		startDate: startDate,
		endDate: endDate,
		contactEmail: contactEmail,
		isContactEnabled: isContactEnabled,

		isActive: isActive,
	};
};
// format 'site_checks' record
const formatSiteCheck = (record = {}) => {
	const {
		id,
		site_id,
		date_created,
		response_time,
		status_info,
		was_successful,
	} = record;

	return {
		id: id,
		siteID: site_id,
		dateCreated: date_created,
		responseTime: response_time,
		statusInfo: status_info,
		wasSuccessful: was_successful,
	};
};
// normalises table data to client format w/ a custom formatter callback
const normaliseTableData = (data = [], formatterCb) => {
	return data.map((record) => formatterCb(record));
};

// CREATE MAPS FOR DEPS: INTERVALS, FREQUENCIES etc

// creates map by 'intervalType' 'name'
const createIntervalsNameMap = (intervals = []) => {
	return intervals.reduce((newMap, record) => {
		const { name } = record;
		if (!newMap[name]) {
			newMap[name] = { ...record };
			return newMap;
		}

		return newMap;
	}, {});
};
const createIntervalsIdMap = (intervals = []) => {
	return intervals.reduce((newMap, record) => {
		const { intervalTypeID } = record;
		if (!newMap[intervalTypeID]) {
			newMap[intervalTypeID] = { ...record };
			return newMap;
		}

		return newMap;
	}, {});
};
// frequency map by 'desc' field
const createFreqTypeMap = (freqOptions = []) => {
	return freqOptions.reduce((newMap, record) => {
		const { desc } = record;
		const trimmedDesc = trimMinuteDesc(desc);

		if (!newMap[trimmedDesc]) {
			newMap[trimmedDesc] = { ...record };
			return newMap;
		}

		return newMap;
	}, {});
};
const createFreqIdMap = (freqOptions = []) => {
	return freqOptions.reduce((newMap, record) => {
		const { frequencyTypeID } = record;

		if (!newMap[frequencyTypeID]) {
			newMap[frequencyTypeID] = { ...record };
			return newMap;
		}

		return newMap;
	}, {});
};

export { enforceStrMaxLength, addEllipsis, trimUrl };
export { numInRange, numToLetter };
export { range, generateID, generateUID };

// formatters
export {
	formatIntervalType,
	formatFreqType,
	formatSiteMonitor,
	formatSiteCheck,
	// generic wrapper
	normaliseTableData,
};

// util/deps map(s)
export {
	createIntervalsNameMap,
	createFreqTypeMap,
	createFreqIdMap,
	createIntervalsIdMap,
};
