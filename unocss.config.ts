import { defineConfig, presetAttributify, presetUno } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";
export default defineConfig({
	/** 排除 */
	exclude: ["node_modules"],
	/** 预设 */
	presets: [
		/** 属性化模式 & 无值的属性模式_不用class */
		presetAttributify(),
		/** 默认预设 */
		presetUno(),
		/** 把官方rem单位转换为px */
		presetRemToPx
	],
	/** 自定义规则 */
	/** 注意：unocss初级使用
	 * 高级用法不熟悉
	 * 例如前缀统一使用unocss+自定义规则，不使用规范规则
	 * 目前，只把unocss用于页面布局单位，不用于主题（虽然试过可以，但关乎主题会比较庞大）
	 */
	rules: [
		["uno-padding-20", { padding: "20px" }],
		// 外边距
		// 其他
		[/^unocss-z-index-(\d+)$/, ([, d]) => ({ "z-index": d })]
	],
	/** 自定义快捷方式 */
	shortcuts: {
		"uno-wh-full": "w-full h-full",
		"uno-flex-center": "flex justify-center items-center",
		"uno-flex-x-center": "flex justify-center",
		"uno-flex-y-center": "flex items-center"
	}
});
