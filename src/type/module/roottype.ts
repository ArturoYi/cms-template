export type permissionsChild = {
	module: string;
	permission: string;
};
export type permissions = {
	module: string;
	permission: permissionsChild;
};
export interface Root {
	userInfo: {
		id: number;
		admin: boolean;
		avatar: string;
		email: string;
		nickname: string;
		permissions: permissions[];
	};
}
