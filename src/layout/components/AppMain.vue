<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const key = computed(() => {
	return route.path;
});
</script>
<template>
	<section class="app-main">
		<router-view v-slot="{ Component }">
			<transition name="fade-transform" mode="out-in">
				<component :is="Component" :key="key" />
			</transition>
		</router-view>
	</section>
</template>
<style scoped lang="scss">
.app-main {
	overflow: hidden !important;
	position: relative;
	width: 100%;
	min-height: calc(100vh - var(--v3-navigationbar-height));
}

.fixed-header + .app-main {
	overflow: auto;
	padding-top: var(--v3-navigationbar-height);
	height: 100vh;
}

.has-tags-view {
	.app-main {
		min-height: calc(100vh - var(--v3-header-height));
	}

	.fixed-header + .app-main {
		padding-top: var(--v3-header-height);
	}
}
</style>
