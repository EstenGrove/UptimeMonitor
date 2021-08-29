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

export { enforceStrMaxLength, addEllipsis, trimUrl };
export { numInRange, numToLetter };
export { range, generateID, generateUID };
