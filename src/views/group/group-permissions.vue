<script setup lang="ts">
import Admin from "@/api/module/admin/admin";
import { useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
const router = useRouter();
const group_id = router.currentRoute.value.params.id;
const permissions = reactive<any>({ list: [] });
const getAllPermissions = async () => {
	const result = await Admin.getAllPermissions();
	Object.entries(result).forEach(([k, v]) => {
		console.log(v);
		permissions.list.push({
			name: k,
			allPermissions: v.map((item: any) => {
				return { id: item.id, name: item.name };
			}),
			checkPermission: [],
			allPermissionsIds: [],
			isIndeterminate: false,
			checkAll: false
		});
	});
};
const getCurrentGroupDetail = async (id: number) => {
	const result = await Admin.getGroupDetail(id);
	console.log(result);
};
type permissionsType = {
	allPermissions?: any;
	allPermissionsIds?: any;
	isIndeterminate?: boolean;
	checkAll?: boolean;
};
// interface permissionsResult {
// 	list: {
// 		[_: string]: Array<permissionsType> | any;
// 	};
// }
onMounted(async () => {
	await getAllPermissions();
	await getCurrentGroupDetail(Number(group_id));
});
function changeGroup(value: permissionsType) {
	console.log(value.allPermissions);
}
</script>
<template>
	<div class="app-container">
		<div class="white-box">
			<div v-for="(item, index) in permissions.list" :key="index">
				<el-checkbox @change="changeGroup(item)" :isIndeterminate="item.isIndeterminate" v-model="item.checkAll">{{ item.name }}</el-checkbox>
				<el-checkbox-group pl-15 pr-100>
					<el-checkbox v-for="(item, index) in item.allPermissions" :key="index">{{ item.name }}</el-checkbox>
				</el-checkbox-group>
			</div>
		</div>
	</div>
</template>
