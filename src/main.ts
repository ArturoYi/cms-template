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
// 样式引入
import "uno.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/style/index.scss";
const app = createApp(App);
/** 加载全局 SVG */
loadSvg(app);
/** 加载插件 */
loadPlugins(app);
//vu官方的在下面鏈式調用
app.use(i18n).use(store).use(router).mount("#app");
