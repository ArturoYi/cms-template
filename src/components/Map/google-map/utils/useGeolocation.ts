import { onMounted, onUnmounted, ref } from "vue";
//切记：这个获取位置会一直获取
export function useGeolocation() {
	const coords = ref({ latitude: 0, longitude: 0 });
	//判斷是否支持定位
	const isSupported = "navigator" in window && "geolocation" in navigator;

	let watcher: number | null = null;
	onMounted(() => {
		if (isSupported) {
			watcher = navigator.geolocation.watchPosition(
				(position) => {
					coords.value = position.coords;
					console.log(position, coords.value);
				},
				(e) => {
					console.error(e);
				},
				{ maximumAge: 0, timeout: 5000, enableHighAccuracy: true }
			);
		}
	});

	onUnmounted(() => {
		if (watcher) {
			navigator.geolocation.clearWatch(watcher);
		}
	});

	return { coords };
}
