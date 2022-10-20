import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// 路由和守衛
import router from "./router";
import "@/router/guard";
const app = createApp(App);
// Element-Plus 组件完整引入
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
/** Element-Plus 全局使用 */
app.use(ElementPlus);

app.use(router).mount("#app");
