import type { Plugin } from "vite";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
export function viteBuildInfo(): Plugin {
	let config: { command: string };
	let startTime: Dayjs;
	let endTime: Dayjs;
	let outDir: string;
	return {
		name: "vite:buildInfo",
		configResolved(resolvedConfig) {
			config = resolvedConfig;
			outDir = resolvedConfig.build?.outDir ?? "dist";
		},
		buildStart() {
			if (config.command === "build") {
				console.log("cms-template打包開始");
				startTime = dayjs(new Date());
			}
		},
		closeBundle() {
			if (config.command === "build") {
				endTime = dayjs(new Date());
				console.log(`cms-template打包結束,（总用时${dayjs.duration(endTime.diff(startTime)).format("mm分ss秒")}，打包后的大小請查看${outDir}文件`);
			}
		}
	};
}
