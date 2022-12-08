const isProduction = process.env.NODE_ENV === "production";
class Logger {
	log(info?: any, title?: string, location?: string) {
		if (!isProduction) {
			title = title ?? "默認日誌";
			location = location ?? "--";
			console.log("%c ⬇️----------------------" + title + "：日誌開始----------------------⬇️", "color: #FFB90F;padding:8px 12px;");
			console.log("位置：" + location);
			console.log(info);
			console.log("%c ⬆️----------------------" + title + "：日誌結束----------------------⬆️", "color: #FFB90F;padding:8px 12px;");
		}
	}
	error(info?: any, title?: string, location?: string) {
		if (!isProduction) {
			title = title ?? "默認日誌";
			location = location ?? "--";
			console.log("%c⬇️----------------------" + title + "：錯誤日誌開始----------------------⬇️", "color: #ff0000;padding:8px 12px;");
			console.log("位置：" + location);
			console.error(info);
			console.log("%c ⬆️----------------------" + title + "：錯誤日誌結束----------------------⬆️", "color: #ff0000;padding:8px 12px;");
		}
	}
}

export default new Logger();
