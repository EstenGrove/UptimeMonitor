// converts '15 minutes' to '15 mins.'
const trimMinuteDesc = (desc) => {
	const [val, _] = desc.split(" ");

	return `${val} mins.`;
};

export { trimMinuteDesc };
