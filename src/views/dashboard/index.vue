<script setup lang="ts">
import router from "@/router";
import { useAppStore } from "@/store/modules/app";
import { ref } from "vue";
import TinymceVue from "@/components/Base/Tinymce/Tinymce.vue";
// import { storeToRefs } from 'pinia'
const appStore = useAppStore();
const handleLogin = () => {
	router.push({ path: "/login" });
};
const toggleSidebar = () => {
	appStore.toggleSidebar(false);
};
const value = ref("");

const options = [
	{
		value: "Option1",
		label: "Option1"
	},
	{
		value: "Option2",
		label: "Option2"
	},
	{
		value: "Option3",
		label: "Option3"
	},
	{
		value: "Option4",
		label: "Option4"
	},
	{
		value: "Option5",
		label: "Option5"
	}
];
</script>
<template>
	<div class="app-container">
		<el-button type="primary" @click="toggleSidebar">sidebar</el-button>
		<el-button type="primary" @click="handleLogin">wo</el-button>
		{{ $t("router.name") }}
		<el-select v-model="value" class="m-2" size="large">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<TinymceVue />
	</div>
</template>
