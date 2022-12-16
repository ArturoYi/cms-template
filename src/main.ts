import { createApp } from "vue";
import App from "@/App.vue";
// pinia
import store from "@/store";
// 路由和守衛
import router from "@/router";
import "@/router/guard";
// i18n国际化
import { i18n } from "@/i18n/index";
// load
import { loadSvg } from "@/icons";
import { loadPlugins } from "@/plugins";
// 样式引入——建議好先後順序
import "@/style/index.scss";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "uno.css";
const app = createApp(App);
/** 加载全局 SVG */
loadSvg(app);
/** 加载插件 */
loadPlugins(app);
//vu官方的在下面鏈式調用
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
Sentry.init({
	app,
	dsn: "https://8526c67167814783b6ee1aa43566a6ce@o4504336361848832.ingest.sentry.io/4504336364142592",
	integrations: [
		new BrowserTracing({
			routingInstrumentation: Sentry.vueRouterInstrumentation(router),
			tracePropagationTargets: ["localhost", "my-site-url.com", /^\//]
		})
	],
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0
});
app.use(i18n).use(store).use(router).mount("#app");
