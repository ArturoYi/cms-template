<script lang="ts">
export default {
	name: "SidebarLogo"
};
</script>

<script setup lang="ts">
const props = defineProps({
	collapse: {
		type: Boolean,
		default: true
	}
});
</script>
<template>
	<div class="sidebar-logo-container" :class="{ collapse: props.collapse }">
		<transition name="sidebar-logo-fade">
			<router-link v-if="props.collapse" key="collapse" to="/">
				<img src="@/assets/layout/logo.png" class="sidebar-logo" />
			</router-link>
			<router-link v-else key="expand" to="/">
				<img src="@/assets/layout/logo-text-1.png" class="sidebar-logo-text" />
			</router-link>
		</transition>
	</div>
</template>
<style scoped lang="scss">
.sidebar-logo-container {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: var(--v3-header-height);
	text-align: center;
	background-color: var(--v3-sidebarlogo-bg-color);
	line-height: var(--v3-header-height);

	.sidebar-logo {
		display: none;
	}

	.sidebar-logo-text {
		height: 100%;
		vertical-align: middle;
	}
}

.collapse {
	.sidebar-logo {
		display: inline-block;
		width: 32px;
		height: 32px;
		vertical-align: middle;
	}

	.sidebar-logo-text {
		display: none;
	}
}
</style>
