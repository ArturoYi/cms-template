export interface loginform {
	username: string;
	password: string;
}

export interface tokenresult {
	access_token: string;
	refresh_token: string;
}

interface permissionsChild {
	module: string;
	permission: string;
}
interface permissions {
	module: string;
	permission: permissionsChild;
}

export interface userinfo {
	id: number;
	nickname: string;
	admin: boolean;
	avatar: string;
	permissions: permissions[];
	email: string;
}

export interface group {
	id: number;
	name: string;
	info: string;
	level: string;
}
