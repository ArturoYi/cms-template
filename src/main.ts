import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// pinia
import store from "./store";
// 路由和守衛
import router from "./router";
import "@/router/guard";
const app = createApp(App);
// Element-Plus 组件完整引入
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
/** Element-Plus 全局使用 */
app.use(ElementPlus);
//vu官方的在下面鏈式調用
app.use(store).use(router).mount("#app");
