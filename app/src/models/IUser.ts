export enum EUserRole {
	admin = "ADMIN",
	manager = "MANAGER",
	non = "NOTHING"
}

export interface IUser {
	name : string,
	password : string,
	role : EUserRole
}

export interface IUserRequest {
	login : string,
	password : string
}