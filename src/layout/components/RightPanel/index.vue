<script lang="ts" setup>
import { ref } from "vue";
import { Setting } from "@element-plus/icons-vue";

const props = defineProps({
	buttonTop: {
		type: Number,
		default: 250
	}
});

const buttontop = props.buttonTop + "px";
const show = ref(false);
</script>

<template>
	<div class="handle-button" @click="show = true">
		<el-icon :size="24">
			<Setting />
		</el-icon>
	</div>
	<el-drawer v-model="show" size="300px" :with-header="false">
		<slot />
	</el-drawer>
</template>

<style lang="scss" scoped>
.handle-button {
	position: absolute;
	top: v-bind(buttontop);
	right: 0;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 6px 0 0 6px !important;
	width: 48px;
	height: 48px;
	font-size: 24px;
	color: #ffffff;
	background-color: var(--v3-rightpanel-button-bg-color);
	cursor: pointer;
	pointer-events: auto;
}
</style>
