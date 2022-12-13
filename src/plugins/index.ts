import { type App } from "vue";
import { loadElementPlus } from "./element-plus";
import { loadElementPlusIcon } from "./element-plus-icon";
import loadAutoJump from "./config/index";
export function loadPlugins(app: App) {
	loadElementPlus(app);
	loadElementPlusIcon(app);
	loadAutoJump(app);
}
