/*
 * @Description:
 * 这个文件只提供类型定义
 */
export interface AdminLoginType {
	username: string;
	password: string;
}

export interface GroupType {
	id: number;
	name: string;
	info: string;
	level: string;
}
