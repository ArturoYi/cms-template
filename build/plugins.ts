/// <reference types="vite/client" />
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import svgLoader from "vite-svg-loader";
import removeConsole from "vite-plugin-remove-console";
// import viteSentry from "vite-plugin-sentry";
import UnoCSS from "unocss/vite";
// 压缩打包
import { configCompressPlugin } from "./compress";
import { viteBuildInfo } from "./info";
import { visualizer } from "rollup-plugin-visualizer";
import { cdn } from "./cdn";
export function getPluginsList(): any {
	console.log(process.env.NODE_ENV + ":" + process.env.NODE_ENV === "production");
	const USE_CDN = process.env.NODE_ENV === "production";
	const lifecycle = process.env.NODE_ENV === "production";
	return [
		vue(),
		UnoCSS(),
		svgLoader(),
		/** SVG */
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
			symbolId: "icon-[dir]-[name]"
		}),
		USE_CDN ? cdn : null,
		// 打包信息
		viteBuildInfo(),
		configCompressPlugin("gzip-clear"),
		// 打包分析
		lifecycle ? visualizer({ open: true, brotliSize: true, filename: "report.html" }) : null,
		// 去除console.log
		removeConsole({ external: ["src/assets/iconfont/iconfont.js", "src/utils/console/index.ts"] })
		/** 錯誤上報**/
		// 	viteSentry({
		// 		url: "https://8526c67167814783b6ee1aa43566a6ce@o4504336361848832.ingest.sentry.io/4504336364142592", //服務器地址
		// 		authToken: "fd3a6d438ca14dc290d518c80a2022efac9b0cec09d34802ae110f176cb3071a", //sentry授权令牌
		// 		org: "tranbiot", //"组织名称",
		// 		project: "cms", // "项目名称",
		// 		release: process.env.SENTRY_VERSION || "0.0.1", //每次必須更改
		// 		deploy: {
		// 			env: "production"
		// 		},
		// 		setCommits: {
		// 			auto: true
		// 		},
		// 		sourceMaps: {
		// 			include: ["./dist/assets"],
		// 			ignore: ["node_modules"],
		// 			urlPrefix: "~/assets"
		// 		}
		// 	})
		// ]
	];
}
