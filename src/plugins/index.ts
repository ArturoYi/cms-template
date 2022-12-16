import { type App } from "vue";
import { loadElementPlus } from "./element-plus";
import { loadElementPlusIcon } from "./element-plus-icon";
import loadAutoJump from "./auto-jump/index";
import { sentryInit } from "./sentry/index";
export function loadPlugins(app: App) {
	sentryInit(app);
	loadElementPlus(app);
	loadElementPlusIcon(app);
	loadAutoJump(app);
}
