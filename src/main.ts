import { createApp } from "vue";
import App from "./App.vue";
// pinia
import store from "./store";
// 路由和守衛
import router from "./router";
import "@/router/guard";
const app = createApp(App);
// 样式引入
import "@/style/index.scss";
import "uno.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
// import "@/style/index.scss";
// load
import { loadSvg } from "@/icons";
/** 加载全局 SVG */
loadSvg(app);
import { loadPlugins } from "@/plugins";
/** 加载插件 */
loadPlugins(app);
// i18n国际化
import { i18n } from "@/i18n/index";
//vu官方的在下面鏈式調用
app.use(i18n).use(store).use(router).mount("#app");
