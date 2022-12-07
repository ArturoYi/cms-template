export interface loginform {
	username: string;
	password: string;
}

export interface tokenresult {
	access_token: string;
	refresh_token: string;
}

export interface userinfo {
	id: number;
	nickname: string;
	admin: boolean;
	avatar: string;
	permissions: Array<any>;
	email: string;
}

export interface group {
	id: number;
	name: string;
	info: string;
	level: string;
}
