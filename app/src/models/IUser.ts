export enum IUserRole {
	admin = "admin",
	manager = "manager",
	non = ""
}

export interface IUser {
	name : string,
	password : string,
	role : IUserRole
}