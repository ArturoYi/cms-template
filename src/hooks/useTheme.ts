import { ref } from "vue";
import { getActiveThemeName, setActiveThemeName } from "@/utils/cache/localStorage";
import { ElMessage } from "element-plus";

interface IThemeList {
	title: string;
	name: ThemeName;
}

/** 注册的主题名称, 其中 normal 是必填的 */
export type ThemeName = "normal" | "dark" | "dark-blue";

/** 主题列表 */
const themeList: IThemeList[] = [
	{
		title: "默认",
		name: "normal"
	},
	{
		title: "黑暗",
		name: "dark"
	},
	{
		title: "深蓝",
		name: "dark-blue"
	}
];

/** 正在应用的主题名称 */
const activeThemeName = ref<ThemeName>(getActiveThemeName() || "normal");

const initTheme = () => {
	setHtmlClassName(activeThemeName.value);
};

const setTheme = (value: ThemeName) => {
	activeThemeName.value = value;
	setHtmlClassName(activeThemeName.value);
	setActiveThemeName(value);
	ElMessage({
		message: "切换主题成功",
		type: "success",
		duration: 800
	});
};

/** 在 html 根元素上挂载 class */
const setHtmlClassName = (value: ThemeName) => {
	document.documentElement.className = value;
};

/** 主题 hook */
export function useTheme() {
	return { themeList, activeThemeName, initTheme, setTheme };
}

// 自定义主题可以用下面，性能一般
type StringNumber = string | number;

export const mixTheme = (color1: string, color2: string, weight: StringNumber) => {
	weight = Math.max(Math.min(Number(weight), 1), 0);
	const r1 = parseInt(color1.substring(1, 3), 16);
	const g1 = parseInt(color1.substring(3, 5), 16);
	const b1 = parseInt(color1.substring(5, 7), 16);
	const r2 = parseInt(color2.substring(1, 3), 16);
	const g2 = parseInt(color2.substring(3, 5), 16);
	const b2 = parseInt(color2.substring(5, 7), 16);
	let r: StringNumber = Math.round(r1 * (1 - weight) + r2 * weight);
	let g: StringNumber = Math.round(g1 * (1 - weight) + g2 * weight);
	let b: StringNumber = Math.round(b1 * (1 - weight) + b2 * weight);
	r = ("0" + (r || 0).toString(16)).slice(-2);
	g = ("0" + (g || 0).toString(16)).slice(-2);
	b = ("0" + (b || 0).toString(16)).slice(-2);
	return "#" + r + g + b;
};

// 改变主题
export function changeTheme(color: string) {
	const node = document.documentElement;
	// 变量前缀
	const pre = "--el-color-primary";
	// // 白色混合色
	const mixWhite = "#ffffff";
	// // 黑色混合色
	const mixBlack = "#000000";
	node.style.setProperty(pre, color);
	node.style.setProperty("--el-color-primary", color);
	// 这里是覆盖原有颜色的核心代码
	for (let i = 1; i < 10; i += 1) {
		node.style.setProperty(`${pre}-light-${i}`, mixTheme(color, mixWhite, i * 0.1));
		node.style.setProperty(`--el-color-primary-dark-${i}`, mixTheme(color, mixBlack, 0.1));
	}
}
