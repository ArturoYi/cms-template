import { type AxiosRequestConfig } from "axios";
// import { ElMessage } from "element-plus";
import { getAccessToken, getRefreshToken } from "@/utils/cache/localStorage";
import { isFile } from "../pluing/file";
export const requestInterceptors = (config: AxiosRequestConfig): AxiosRequestConfig => {
	// 需要请求地址
	if (!config.url) {
		Promise.reject("request need url");
	}
	// 需要请求方法，默认get
	if (!config.method) {
		config.method = "get";
	}
	// 大小写容错
	config.method = config.method.toLowerCase();
	// 参数容错
	if (config.method === "get") {
		if (!config.params) {
			// 防止字段用错
			config.params = config.data || {};
		}
	} else if (config.method === "post") {
		if (!config.data) {
			// 防止字段用错
			config.data = config.params || {};
		}
	}
	// 判断是否上传文件，统一包裹
	if (config.method === "post" && isFile(config)) {
		const formData = new FormData();
		Object.keys(config.data).forEach((key) => {
			formData.append(key, config.data[key]);
		});
		config.data = formData;
	}
	//如果是刷新token的请求，还要把token换成r_token
	if (config.url === "tranbiot-core/cms/user/refresh") {
		config.headers!.Authorization = getRefreshToken();
	} else {
		config.headers!.Authorization = getAccessToken();
	}
	return config;
};
