import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
// pinia
import store from "./store";
// 路由和守衛
import router from "./router";
import "@/router/guard";
const app = createApp(App);
// 自定义样式
import "@/style/index.scss";
// 样式引入
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
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
