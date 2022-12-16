import { type App } from "vue";
import AuthJump from "./auto-jump";
export default function loadAutoJump(app: App) {
	app.use(AuthJump);
}
