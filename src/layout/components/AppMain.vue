<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const key = computed(() => {
	return route.path;
});
</script>
<template>
	<router-view v-slot="{ Component }">
		<transition>
			<component :is="Component" :key="key" />
		</transition>
	</router-view>
</template>
