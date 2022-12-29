import { type Directive } from "vue";
// 下面指令还不能使用，有歧义
/** 权限指令 */
export const permission: Directive = {
	mounted(el, binding) {
		const { value } = binding;
		const roles: string[] = [];
		if (value && value instanceof Array && value.length > 0) {
			const permissionRoles = value;
			const hasPermission = roles.some((role) => {
				return permissionRoles.includes(role);
			});
			if (!hasPermission) {
				el.style.display = "none";
			}
		} else {
			throw new Error(`need roles! Like v-permission="['admin','editor']"`);
		}
	}
};
