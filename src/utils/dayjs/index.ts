import dayjs from "dayjs";
// import en from "dayjs/locale/de";
import zh_cn from "dayjs/locale/zh-cn";
import utc from "dayjs/plugin/utc";
const myDate = dayjs;
myDate.extend(utc);
myDate.locale(zh_cn);
export function getDate() {
	return myDate().format();
}
