const COLORS_MAP = {
	purple: {
		50: "rgb(245, 243, 255)",
		100: "rgb(237, 233, 254)",
		200: "rgb(221, 214, 254)",
		300: "rgb(196, 181, 253)",
		400: "rgb(167, 139, 250)",
		500: "rgb(139, 92, 246)",
		600: "rgb(124, 58, 237)",
		700: "rgb(109, 40, 217)",
		800: "rgb(91, 33, 182)",
		900: "rgb(76, 29, 149)",
	},
	blue: {
		50: "rgb(239, 246, 255)",
		100: "rgb(219, 234, 254)",
		200: "rgb(191, 219, 254)",
		300: "rgb(147, 197, 253)",
		400: "rgb(96, 165, 250)",
		500: "rgb(59, 130, 246)",
		600: "rgb(37, 99, 235)",
		700: "rgb(29, 78, 216)",
		800: "rgb(30, 64, 175)",
		900: "rgb(30, 58, 138)",
	},
	red: {
		50: "rgb(254, 242, 242)",
		100: "rgb(254, 226, 226)",
		200: "rgb(254, 202, 202)",
		300: "rgb(252, 165, 165)",
		400: "rgb(248, 113, 113)",
		500: "rgb(239, 68, 68)",
		600: "rgb(220, 38, 38)",
		700: "rgb(185, 28, 28)",
		800: "rgb(153, 27, 27)",
		900: "rgb(127, 29, 29)",
	},
	pink: {
		100: "rgb(255, 245, 247)",
		200: "rgb(254, 215, 226)",
		300: "rgb(251, 182, 206)",
		400: "rgb(246, 135, 179)",
		500: "rgb(237, 100, 166)",
		600: "rgb(213, 63, 140)",
		700: "rgb(184, 50, 128)",
		800: "rgb(151, 38, 109)",
		900: "rgb(112, 36, 89)",
	},
	green: {
		50: "rgb(236, 253, 245)",
		100: "rgb(209, 250, 229)",
		200: "rgb(167, 243, 208)",
		300: "rgb(110, 231, 183)",
		400: "rgb(52, 211, 153)",
		500: "rgb(16, 185, 129)",
		600: "rgb(5, 150, 105)",
		700: "rgb(4, 120, 87)",
		800: "rgb(6, 95, 70)",
		900: "rgb(6, 78, 59)",
	},
	yellow: {
		50: "rgb(255, 251, 235)",
		100: "rgb(254, 243, 199)",
		200: "rgb(253, 230, 138)",
		300: "rgb(252, 211, 77)",
		400: "rgb(251, 191, 36)",
		500: "rgb(245, 158, 11)",
		600: "rgb(217, 119, 6)",
		700: "rgb(180, 83, 9)",
		800: "rgb(146, 64, 14)",
		900: "rgb(120, 53, 15)",
	},
	orange: {
		50: "rgb(255, 247, 237)",
		100: "rgb(255, 237, 213)",
		200: "rgb(254, 215, 170)",
		300: "rgb(253, 186, 116)",
		400: "rgb(251, 146, 60)",
		500: "rgb(249, 115, 22)",
		600: "rgb(234, 88, 12)",
		700: "rgb(194, 65, 12)",
		800: "rgb(154, 52, 18)",
		900: "rgb(124, 45, 18)",
	},
	grey: {
		50: "rgb(250, 250, 250)",
		100: "rgb(244, 244, 245)",
		200: "rgb(228, 228, 231)",
		300: "rgb(212, 212, 216)",
		400: "rgb(161, 161, 170)",
		500: "rgb(113, 113, 122)",
		600: "rgb(82, 82, 91)",
		700: "rgb(63, 63, 70)",
		800: "rgb(39, 39, 42)",
		900: "rgb(24, 24, 27)",
	},
	blueGrey: {
		50: "rgb(248, 250, 252)",
		100: "rgb(241, 245, 249)",
		200: "rgb(226, 232, 240)",
		300: "rgb(203, 213, 225)",
		400: "rgb(148, 163, 184)",
		500: "rgb(100, 116, 139)",
		600: "rgb(71, 85, 105)",
		700: "rgb(51, 65, 85)",
		800: "rgb(30, 41, 59)",
		900: "rgb(15, 23, 42)",
	},
	teal: {
		100: "rgb(230, 255, 250)",
		200: "rgb(178, 245, 234)",
		300: "rgb(129, 230, 217)",
		400: "rgb(79, 209, 197)",
		500: "rgb(56, 178, 172)",
		600: "rgb(49, 151, 149)",
		700: "rgb(44, 122, 123)",
		800: "rgb(40, 94, 97)",
		900: "rgb(35, 78, 82)",
	},
};

const { purple, blue, red, pink, green, yellow, orange, grey, blueGrey, teal } =
	COLORS_MAP;

// MONITOR CSS STYLES //

// responseTime styles
const responseTimeCSS = {
	fast: {
		color: green[600],
	},
	normal: {
		color: blueGrey[700],
	},
	slow: {
		color: red[600],
	},
	"very slow": {
		color: red[600],
	},
	// left border styles based off request
	success: {
		borderLeft: `7px solid ${green[500]}`,
	},
	failure: {
		borderLeft: `7px solid ${red[600]}`,
	},
};

/**
 * Returns custom CSS styles based off response time.
 * @param {Number} time - HTTP response time in milliseconds.
 * @returns {Object} - Returns object styles by response time.
 */
const getTimeStyles = (time) => {
	const timeClass = getTimeClass(time);

	switch (timeClass) {
		case "very slow": {
			return responseTimeCSS["very slow"];
		}
		case "slow": {
			return responseTimeCSS["slow"];
		}
		case "normal": {
			return responseTimeCSS["normal"];
		}
		case "fast": {
			return responseTimeCSS["fast"];
		}
		default:
			return responseTimeCSS["normal"];
	}
};
/**
 * Determines a response time's speed class. Whether it's 'fast', 'normal', 'slow', 'very slow'
 * @param {Number} time - HTTP response time in milliseconds.
 * @returns {String} - Returns response time's speed classification.
 */
const getTimeClass = (time) => {
	switch (true) {
		case time >= 180: {
			return "very slow";
		}
		case time >= 150: {
			return "slow";
		}
		case time >= 100: {
			return "normal";
		}
		case time <= 99: {
			return "fast";
		}
		default:
			return "normal";
	}
};

export {
	COLORS_MAP,
	// individual colors
	purple,
	blue,
	red,
	pink,
	green,
	yellow,
	orange,
	grey,
	blueGrey,
	teal,
};

export { getTimeClass, getTimeStyles };
