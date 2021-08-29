import { currentEnv } from "./utils_env";

const checkAppServices = async () => {
	let url = currentEnv.base;

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const response = await request.json();
		console.log(`Response:`, response);
		return response;
	} catch (err) {
		console.log(`❌ Oops! An error occurred:`, err);
		return err.message;
	}
};

export { checkAppServices };
