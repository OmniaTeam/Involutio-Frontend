export enum IUserRole {
	admin = "admin",
	manager = "manager"
}

export interface IUser {
	name : string,
	password : string,
	role : IUserRole
}