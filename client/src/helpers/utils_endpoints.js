import { currentEnv } from "./utils_env";

// base API prefix path
const apiPrefix = "/api";
// api version path
const apiVersion = "/v1";

const endpoints = {
	monitor: {
		update: {
			entry: "/updateMonitor", // updates url or name
			settings: "/updateMonitorSettings", // updates frequency of ping
		},
		create: {
			new: "newMonitor",
		},
		remove: {
			entry: "/removeMonitor",
		},
		get: {
			group: "/getMonitorGroup", // returns a custom group of monitors
			monitorChart: "/getMonitorChart", // fetches data for chart UI
		},
	},
	app: {
		services: {
			checkStatus: "/checkMonitorStatus",
		},
		update: {
			force: "/forceUpdate",
			checkForUpdates: "/checkForUpdates",
		},
	},
};

// base API url <http|https>://<currentEnv><prefix><version>  (eg. 'https://localhost:8080/api/v1')
// const baseUrl = currentEnv.base + apiPrefix + apiVersion;
// const baseUrl = currentEnv?.base + apiPrefix;

export { apiPrefix, apiVersion, endpoints };
// export { baseUrl };
