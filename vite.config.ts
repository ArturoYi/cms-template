/// <reference types="vite/client" />
import { loadEnv, ConfigEnv, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import svgLoader from "vite-svg-loader";
import viteSentry from "vite-plugin-sentry";
import UnoCSS from "unocss/vite";
// 压缩打包
import viteCompression from "vite-plugin-compression";
const Timestamp = new Date().getTime();
// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfigExport => {
	const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;
	const { VITE_PUBLIC_PATH } = viteEnv;
	const { VITE_BASE_API } = viteEnv;
	return <UserConfigExport>{
		server: {
			// port: 8989 //指定端口号
		},
		proxy: {
			"/api": {
				target: VITE_BASE_API,
				changeOrigin: true, // 允许跨域
				rewrite: (path: string) => path.replace(/^\/api/, "")
			}
		},
		/** 打包时根据实际情况修改 base */
		base: VITE_PUBLIC_PATH,
		//文件别名
		resolve: {
			alias: {
				/** @ 符号指向 src 目录 */
				"@": resolve(__dirname, "./src")
			}
		},
		//service
		build: {
			sourcemap: process.env.NODE_ENV === "production",
			/** 消除打包大小超过 500kb 警告 */
			chunkSizeWarningLimit: 2000,
			/** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
			minify: "terser",
			/** 在打包代码时移除 console.log、debugger 和 注释 */
			terserOptions: {
				compress: {
					drop_console: false, //不删除【console.】,可能你需要用到一些error提示
					drop_debugger: true,
					pure_funcs: ["console.log"] //删除console.log
				},
				format: {
					//删除注释
					comments: true
				}
			},
			/** 打包后静态资源目录,慎重配置 */
			// assetsDir: "static"
			rollupOptions: {
				output: {
					chunkFileNames: `js/[name]-[hash]-${Timestamp}.js`,
					entryFileNames: `js/[name]-[hash]-${Timestamp}.js`,
					assetFileNames: `[ext]/[name]-[hash]-${Timestamp}.[ext]`
				}
			}
		},
		//viter插件
		// UnoCSS()
		plugins: [
			vue() /** 将 SVG 静态图转化为 Vue 组件 */,
			UnoCSS(),
			svgLoader(),
			/** SVG */
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
				symbolId: "icon-[dir]-[name]"
			}),
			viteCompression({
				threshold: 1024000 // 对大于 1mb 的文件进行压缩
			}),
			/** 錯誤上報**/
			viteSentry({
				url: "https://8526c67167814783b6ee1aa43566a6ce@o4504336361848832.ingest.sentry.io/4504336364142592", //服務器地址
				authToken: "fd3a6d438ca14dc290d518c80a2022efac9b0cec09d34802ae110f176cb3071a", //sentry授权令牌
				org: "tranbiot", //"组织名称",
				project: "cms", // "项目名称",
				release: process.env.SENTRY_VERSION || "0.0.1", //每次必須更改
				deploy: {
					env: "production"
				},
				setCommits: {
					auto: true
				},
				sourceMaps: {
					include: ["./dist/assets"],
					ignore: ["node_modules"],
					urlPrefix: "~/assets"
				}
			})
		]
	};
};
