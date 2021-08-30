import { currentEnv } from "./utils_env";

// base API prefix path
const apiPrefix = "/api";
// api version path
const apiVersion = "/v1";

const endpoints = {
	monitor: {
		base: "/sites",
		update: {
			entry: "/update-site", // updates url or name
			settings: "/update-site", // updates frequency of ping
		},
		create: {
			entry: "/add-site",
		},
		remove: {
			entry: "/delete-site",
		},
		get: {
			allSites: "/sites",
			group: "/site-group", // returns a custom group of monitors
			monitorChart: "UNKNOWN", // fetches data for chart UI
		},
	},
	intervals: {
		get: {
			allTypes: "/intervals",
		},
		create: {
			entry: "/add-interval",
		},
	},
	frequency: {
		get: {
			allTypes: "/frequency",
		},
		create: {
			entry: "/add-frequency",
		},
	},
	app: {
		services: {
			checkStatus: "/api",
		},
		update: {
			force: "/force-update",
			checkForUpdates: "/check-for-updates",
		},
	},
};
const { monitor, app, frequency, intervals } = endpoints;

// base API url <http|https>://<currentEnv><prefix><version>  (eg. 'https://localhost:8080/api/v1')
// const baseUrl = currentEnv.base + apiPrefix + apiVersion;
// const baseUrl = currentEnv?.base + apiPrefix;

export { apiPrefix, apiVersion };
export { monitor, app, intervals, frequency, endpoints };
