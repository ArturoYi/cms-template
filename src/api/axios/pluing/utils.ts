/*
 * @Description:
 * @User: Chen
 * @Date: 2022-11-19 23:45:05
 */
export const getReqUrl = (url: string) => {
	const baseUrl = import.meta.env.BASE_URL;
	if (url.indexOf(baseUrl) === 0) {
		return url;
	}
	url = url.replace(/^\//, "");
	url = baseUrl + "/" + url;
	return url;
};
