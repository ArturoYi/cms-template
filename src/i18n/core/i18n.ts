/*
 * @Description:
 * @User: Chen
 * @Date: 2022-10-28 18:20:17
 */
import { createI18n } from "vue-i18n";
import { en } from "@/i18n/lang/en/en";
import { zh_cn } from "@/i18n/lang/zh/zh";
import elzhcn from "element-plus/lib/locale/lang/zh-cn";
import elen from "element-plus/lib/locale/lang/en";
// 语言配置整合-下面整合方式可以假如外部语言包，但我没有这么做
const messages = {
	en: { ...en, ...elen },
	zh_cn: { ...zh_cn, ...elzhcn }
};
//创建实例
const i18n = createI18n({
	locale: "en", //读取本地存储的语言
	legacy: false,
	// DateTimeFormats: {},
	// numberFormats: {},
	globalInjection: true, //是否全局注入
	fallbackLocale: "en", //回退用的语言
	messages
});
export default i18n;
