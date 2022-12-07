export interface page<T> {
	total: number;
	items: T;
	page: number;
	count: number;
}
