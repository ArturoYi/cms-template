<script setup lang="ts">
// import router from "@/router";
// import { useAppStore } from "@/store/modules/app";
import { ref } from "vue";
import TinymceVue from "@/components/Base/Tinymce/Tinymce.vue";
import { changeTheme } from "@/hooks/useTheme";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const handleLogin = () => {
	userStore.a++;
};
const toggleSidebar = () => {
	userStore.$reset();
	// appStore.toggleSidebar(false);
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
const changeThemel = () => {
	changeTheme("#0062ff");
};
</script>
<template>
	<div class="app-container">
		{{ userStore.a }}
		<el-button type="primary" @click="toggleSidebar">sidebar</el-button>
		<el-button type="primary" @click="handleLogin">wo</el-button>
		{{ $t("router.name") }}
		<el-select v-model="value" class="m-2" size="large">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<el-button @click="changeThemel">12</el-button>
		<TinymceVue />
	</div>
</template>
