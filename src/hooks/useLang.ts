import { ref, computed } from "vue";
import { getLang, setLang } from "@/utils/cache/localStorage";
import { ElMessage } from "element-plus";
// 下面两个是一样的
import i18n from "@/i18n/core/i18n";
/***
 * elementUI PLUS语言配置
 * 有个不会刷新语言的bug，目前尚未解决
 * */
import zhtw from "element-plus/lib/locale/lang/zh-tw";
import en from "element-plus/lib/locale/lang/en";
interface ILangList {
	title: string;
	name: LangName;
}
/** 注册的主题名称, 其中 normal 是必填的 */
export type LangName = "zh_tw" | "en";
export enum LangEnum {
	zn_tw = "zh_tw",
	en = "en"
}
/** 语言列表 */
const langList: ILangList[] = [
	{
		title: "中文",
		name: "zh_tw"
	},
	{
		title: "英语",
		name: "en"
	}
];

const getLoaclStoage = (): LangName => {
	// typeof
	if (typeof getLang() === "string") {
		for (const lang of langList) {
			if (getLang() === lang.name) {
				return getLang() as LangName;
			}
		}
	}
	return "zh_tw";
};
/** 正在使用的主题名称*/
const activeLangName = ref<LangName>(getLoaclStoage() || LangEnum.zn_tw);

const initLang = () => {
	// 添加标签
	document.querySelector("html")?.setAttribute("lang", activeLangName.value);
	setLang(activeLangName.value);
	// setHtmlLangName(activeLangName.value);
	i18n.global.locale.value = activeLangName.value;
};

// 切换语言
const setHtmlLangName = (locale: LangName) => {
	// 添加标签
	document.querySelector("html")?.setAttribute("lang", locale);
	setLang(locale);
	activeLangName.value = locale;
	i18n.global.locale.value = locale;
	ElMessage({
		message: "切换语言成功",
		type: "success",
		duration: 800
	});
};
const locale = computed(() => {
	return activeLangName.value === "zh_tw" ? zhtw : en;
});

/** 语言hook*/
export function useLang() {
	return { setHtmlLangName, setLang, initLang, langList, activeLangName, locale };
}
