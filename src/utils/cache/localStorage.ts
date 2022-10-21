class LocalStorage {
	get(key: string) {
		return localStorage.getItem(key) ? localStorage.getItem(key) : null;
	}
	set(key: string, value: any) {
		localStorage.setItem(key, value);
	}
	remove(key: string) {
		localStorage.removeItem(key);
	}
}
export default new LocalStorage();
