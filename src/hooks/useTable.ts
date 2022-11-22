import { ref } from "vue";

const count = ref<number>(10);
const page = ref<number>(0);
const total = ref<number>(0);

export function tablePage() {
	return { count, page, total };
}
