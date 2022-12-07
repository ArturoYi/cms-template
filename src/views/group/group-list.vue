<script setup lang="ts">
import { reactive, ref } from "vue";
import { options } from "@/hooks/useTable";
import usePage from "@/hooks/useTable";
import { group } from "@/api/module/admin/dto";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import Admin from "@/api/module/admin/admin";
const router = useRouter();
const handleGroupAdd = () => {
	router.push("/group/add");
};
const edit_form = reactive<group>({
	id: 0,
	name: "",
	info: "",
	level: ""
});
const edit_dialog = ref<boolean>(false);
const params = reactive<options>({
	url: "/tranbiot-core/cms/admin/group/all",
	params: {
		page: 0,
		count: 10
	}
});

const { loading, page, count, total, handleQueryList, table_date, get_list_date } = usePage<group[]>(params);
const handleEdit = (index: number, item: group) => {
	Object.assign(edit_form, item);
	edit_dialog.value = true;
};
const handlePutGroup = async () => {
	await Admin.putGroup(edit_form.id, edit_form);
	get_list_date.value = new Date();
	edit_dialog.value = false;
	ElMessage({
		type: "success",
		message: "编辑成功"
	});
};
const handleDelete = (index: number, item: group) => {
	console.log(index, item);
	ElMessageBox.confirm("是否确认删除", "提示", {
		confirmButtonText: "OK",
		cancelButtonText: "Cancel",
		type: "warning"
	})
		.then(async () => {
			Admin.deleteGroup(item.id);
			await handleQueryList();
			get_list_date.value = new Date();
			ElMessage({
				type: "success",
				message: "删除成功"
			});
		})
		.catch(() => {
			ElMessage({
				type: "info",
				message: "Delete canceled"
			});
		});
};
const handleGroup = (index: number, item: group) => {
	router.push({ path: `/${item.id}/permissions`, name: "group-permissions", params: { id: item.id } });
};
const handleSizeChange = (val: number) => {
	console.log(val);
};
const handleCurrentChange = (val: number) => {
	console.log(val);
};
</script>
<template>
	<div class="app-container">
		<div class="white-box">
			<el-button type="primary" @click="handleGroupAdd">添加分组</el-button>
			<el-table v-loading="loading.value" :data="table_date.list" stripe style="width: 100%">
				<template #empty>
					<el-empty description="description" />
				</template>
				<el-table-column prop="name" label="操作权限" min-width="180" />
				<el-table-column prop="info" label="分组描述" min-width="180" />
				<el-table-column label="Operations">
					<template #default="scope">
						<el-button type="primary" link @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
						<el-button type="primary" link @click="handleGroup(scope.$index, scope.row)">权限</el-button>
						<el-button link type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				uno-center
				m-t-8
				m-b-10
				background
				v-model:current-page="page"
				:page-size="count"
				layout="total, prev, pager, next"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
			<!-- 编辑模态框 -->
			<el-dialog v-model="edit_dialog" title="编辑">
				<el-form :model="edit_form">
					<el-form-item label="名称">
						<el-input v-model="edit_form.name" />
					</el-form-item>
					<el-form-item label="介绍">
						<el-input v-model="edit_form.info" />
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="edit_dialog = false">Cancel</el-button>
						<el-button type="primary" @click="handlePutGroup"> Confirm </el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</div>
</template>
