/*
 * @Description:
 * @User: Chen
 * @Date: 2022-10-28 17:17:09
 */
const SYSTEM_NAME = "v3-admin-vite";

/** 缓存数据时用到的 Key */
class CacheKey {
	static ACCESS_TOKEN = `${SYSTEM_NAME}-access-token-key`;
	static REFRESH_TOKEN = `${SYSTEM_NAME}-refresh-token-key`;
	static SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`;
	static ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`;
	static USER_INFO = `${SYSTEM_NAME}-user-info-key`;
	static ISLOGED = `${SYSTEM_NAME}-isloged-key`;
	static LANG = `${SYSTEM_NAME}-lang-key`;
}

export default CacheKey;
