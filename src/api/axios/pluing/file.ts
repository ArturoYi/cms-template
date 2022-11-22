import { type AxiosRequestConfig } from "axios";
export const isFile = (reqConfig: AxiosRequestConfig): boolean => {
	let hasFile = false;
	Object.keys(reqConfig.data).forEach((key) => {
		if (typeof reqConfig.data[key] === "object") {
			const item = reqConfig.data[key];
			if (item instanceof FileList || item instanceof File || item instanceof Blob) {
				hasFile = true;
			}
		}
	});
	return hasFile;
};
