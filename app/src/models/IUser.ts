export enum EUserRole {
	admin = "ADMIN",
	manager = "MANAGER",
	non = "NOTHING"
}

export interface IUser {
	id: number,
	fio: string,
	login: string
	role : EUserRole
}

export interface IUserRequest {
	login : string,
	password : string
}