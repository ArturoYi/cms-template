import { reactive, ref, watch } from "vue";
// reactive,
import { typeRequest } from "@/api/axios/index";
// import { GroupType } from "@/api/module/admin/admin-type";
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
	const loading = ref<boolean>(false);
	const page = ref<number>(0);
	const count = ref<number>(0);
	const total = ref<number>(0);
	const res = typeRequest<T>();
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
		console.log("请求数据");
		loading.value = false;
		const result = await res({
			url: options.url,
			params: options.params,
			method: "get"
		});
		loading.value = true;
		table_date.list = result.data.data || [];
		list.value = result.data.data || [];
		total.value = table_date.list.length ?? 0;
		page.value = options.params.page + 1;
		count.value = options.params.count;
	};
	handleQueryList();
	// 监听page变化
	watch(page, () => {
		handleQueryList();
	});
	watch(get_list_date, () => {
		handleQueryList();
	});
	return { loading, page, count, total, list, table_date, get_list_date, handleQueryList };
}

const count = ref<number>(10);
const page = ref<number>(0);
const total = ref<number>(0);

export function tablePage() {
	return { count, page, total };
}
