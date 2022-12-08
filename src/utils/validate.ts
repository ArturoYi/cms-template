import Logger from "@/utils/console/index";
// 判断是否外链
export const isExternal = (path: string) => {
	const reg = /^(https?:|mailto:|tel:)/;
	return reg.test(path);
};

/** 将全局 CSS 变量导入 JS 中使用 */
export const getCssVariableValue = (cssVariableName: string) => {
	let cssVariableValue = "";
	try {
		// 没有拿到值时，会返回空串
		cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName);
	} catch (error) {
		Logger.error(error, "獲取不到全局css變量", "getCssVariableValue()");
	}
	return cssVariableValue;
};

// 判断一个元素是否要溢出屏幕
export const checkOverflow = (el: HTMLElement) => {
	const curOverflow = el.style.overflow;
	if (!curOverflow || curOverflow === "visible") {
		//先让溢出效果为 hidden 这样才可以比较 clientHeight和scrollHeight
		el.style.overflow = "hidden";
	}
	const isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight > el.scrollHeight;

	// 恢复原始属性
	el.style.overflow = curOverflow;
	// 如果不满就返回false
	return isOverflowing;
};
