import { reactive, ref, watch } from "vue";
// reactive,
import { request } from "@/api/axios/index";
// 定义类型
export type options = {
	url?: string;
	params: {
		page: number;
		count: number;
		[key: string]: any;
	};
};

export default function usePage<T>(options: options) {
	// 定义分页查询参数
	const get_list_date = ref<Date>(new Date());
	const loading = ref<boolean>(true);
	const page = ref<number>(0);
	const count = ref<number>(0);
	const total = ref<number>(0);
	/***
	 *   这里any必须后面判断是否围殴Array类型
	 * list：是通过ref获取数据
	 * table_date：通过reactive获取数据
	 */
	const list = ref<T | any>([]);
	const table_date = reactive<T | any>({
		list: []
	});
	// 在这里统一请求
	const handleQueryList = async () => {
		loading.value = true;
		const result = await request<T | any>({
			url: options.url,
			params: options.params,
			method: "get"
		});
		// 自带分页返回
		if (result.data.data.total) {
			table_date.list = result.data.data.items || [];
			list.value = result.data.data.items || [];
			total.value = result.data.data.total ?? 0;
			page.value = result.data.data.page;
			count.value = result.data.data.count;
		} else {
			table_date.list = result.data.data || [];
			list.value = result.data.data || [];
			total.value = table_date.list.length ?? 0;
			page.value = options.params.page + 1;
			count.value = options.params.count;
		}
		setTimeout(() => {
			loading.value = false;
		}, 500);
	};
	setTimeout(() => {
		handleQueryList(), 300;
	});
	// 监听page变化
	watch(page, () => {
		handleQueryList();
	});
	watch(get_list_date, () => {});
	return { loading, page, count, total, list, table_date, get_list_date, handleQueryList };
}

// const count = ref<number>(10);
// const page = ref<number>(0);
// const total = ref<number>(0);

// export function tablePage() {
// 	return { count, page, total };
// }
