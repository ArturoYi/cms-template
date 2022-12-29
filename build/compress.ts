import type { Plugin } from "vite";
import viteCompression from "vite-plugin-compression";
type ViteCompression = "none" | "gzip" | "brotli" | "both" | "gzip-clear" | "brotli-clear" | "both-clear";
export const configCompressPlugin = (compress: ViteCompression): Plugin | Plugin[] | null => {
	if (compress === "none") return null;

	const gz = {
		// 生成的压缩包后缀
		ext: ".gz",
		// 体积大于threshold才会被压缩
		threshold: 0,
		// 默认压缩.js|mjs|json|css|html后缀文件，设置成true，压缩全部文件
		filter: () => true,
		// 压缩后是否删除原始文件
		deleteOriginFile: false
	};
	const br = {
		ext: ".br",
		algorithm: "brotliCompress",
		threshold: 0,
		filter: () => true,
		deleteOriginFile: false
	};

	const codeList = [
		{ k: "gzip", v: gz },
		{ k: "brotli", v: br },
		{ k: "both", v: [gz, br] }
	];

	const plugins: Plugin[] = [];

	codeList.forEach((item) => {
		if (compress.includes(item.k)) {
			if (compress.includes("clear")) {
				if (Array.isArray(item.v)) {
					item.v.forEach((vItem) => {
						plugins.push(viteCompression(Object.assign(vItem, { deleteOriginFile: true })));
					});
				} else {
					plugins.push(viteCompression(Object.assign(item.v, { deleteOriginFile: true })));
				}
			} else {
				if (Array.isArray(item.v)) {
					item.v.forEach((vItem) => {
						plugins.push(viteCompression(vItem));
					});
				} else {
					plugins.push(viteCompression(item.v));
				}
			}
		}
	});
	return plugins;
};
