<script lang="ts">
export default {
	name: "GoogleMap"
};
</script>
<script setup lang="ts">
import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useGeolocation } from "./utils/useGeolocation";
const GOOGLE_MAPS_API_KEY = "AIzaSyDTd9W2s5C366LS7hn_olaIYOAT4ggk_yo";
const { coords } = useGeolocation();
const currPos = computed(() => ({
	lat: coords.value.latitude,
	lng: coords.value.longitude
}));
// 定义地图和要使用的事件
const loadOption: LoaderOptions = { apiKey: GOOGLE_MAPS_API_KEY, region: "China", language: "zh-HK" };
const loader = new Loader(loadOption);
const GoogleMap = ref<HTMLElement | null>(null);
const map = ref<any>(null);
let clickListener: any = null;
onMounted(async () => {
	await loader
		.load()
		.then((google) => {
			map.value = new google.maps.Map(GoogleMap.value as HTMLElement, {
				center: currPos.value,
				zoom: 7
			});
			clickListener = map.value.addListener("click", (e: any) => {
				console.log(e.latLng);
			});
		})
		.catch((error: any) => {
			console.error(error);
		});
});
onUnmounted(async () => {
	if (clickListener) clickListener.remove();
});
</script>
<template>
	<div>
		<div ref="GoogleMap" id="GoogleMap" style="width: 100%; height: 500px" />
	</div>
</template>
