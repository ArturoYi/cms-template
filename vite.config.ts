/// <reference types="vite/client" />
import { loadEnv, ConfigEnv, UserConfigExport } from "vite";
import { resolve } from "path";
const Timestamp = new Date().getTime();
// @ts-ignore
import { getPluginsList } from "./build/plugins";
// @ts-ignore
import { include, exclude } from "./build/optimize";
// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfigExport => {
	const viteEnv = loadEnv(configEnv.mode, process.cwd()); //as ImportMetaEnv;
	const { VITE_PUBLIC_PATH } = viteEnv;
	const { VITE_BASE_API } = viteEnv;
	return <UserConfigExport>{
		server: {
			// 是否开启 https
			https: false,
			port: 8989, //指定端口号
			proxy: {
				"/api": {
					target: VITE_BASE_API,
					changeOrigin: true, // 允许跨域
					rewrite: (path: string) => path.replace(/^\/api/, "")
				}
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
		optimizeDeps: {
			include,
			exclude
		},
		//service
		build: {
			sourcemap: process.env.NODE_ENV === "production",
			/** 消除打包大小超过 500kb 警告 */
			chunkSizeWarningLimit: 2000,
			/** 打包后静态资源目录,慎重配置 */
			// assetsDir: "static"
			rollupOptions: {
				input: {
					index: resolve(__dirname, "index.html")
				},
				output: {
					chunkFileNames: `js/[name]-[hash]-${Timestamp}.js`,
					entryFileNames: `js/[name]-[hash]-${Timestamp}.js`,
					assetFileNames: `[ext]/[name]-[hash]-${Timestamp}.[ext]`
				}
			}
		},
		//viter插件
		// UnoCSS()
		plugins: getPluginsList()
	};
};
