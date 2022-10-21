import router from "@/router";
router.beforeEach(async (to, form, next) => {
	/**
	 * 正常我們只需要做兩件事
	 * 是否已經登錄
	 * 是否有權限
	 */
	next();
});
