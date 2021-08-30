import { isEmptyObj } from "./utils_types";

const genericGet = async (url, params = {}) => {
	if (!isEmptyObj(params)) {
		url += "?" + new URLSearchParams({ ...params });
	}

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const response = await request.json();
		return response;
	} catch (err) {
		return err;
	}
};
const genericPost = async (url, params = {}, body) => {
	if (!isEmptyObj(params)) {
		url += "?" + new URLSearchParams({ ...params });
	}

	try {
		const request = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const response = await request.json();
		return response;
	} catch (err) {
		return err;
	}
};
const genericPut = async (url, params = {}, body) => {
	if (!isEmptyObj(params)) {
		url += "?" + new URLSearchParams({ ...params });
	}

	try {
		const request = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const response = await request.json();
		return response;
	} catch (err) {
		return err;
	}
};
const genericDelete = async (url, params = {}) => {
	if (!isEmptyObj(params)) {
		url += "?" + new URLSearchParams({ ...params });
	}

	try {
		const request = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const response = await request.json();
		return response;
	} catch (err) {
		return err;
	}
};

export { genericGet, genericPost, genericPut, genericDelete };
