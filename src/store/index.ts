import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const store = createPinia();
store.use(piniaPluginPersistedstate);
// 重置數據W
store.use(({ store }) => {
	const initStore = JSON.parse(JSON.stringify(store.$state));
	store.$reset = () => {
		console.log(store.$state);
		store.$state = JSON.parse(JSON.stringify(initStore));
	};
});
export default store;
