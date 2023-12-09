import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserRole } from "../../models/IUser";

const initialState : IUser = {
	name : "",
	password : "",
	role : IUserRole.manager
}

export const IUserSlice = createSlice({
	name : "user",
	initialState,
	reducers : {
		signIn : (state, action : PayloadAction<IUser>) => {
			state.name = action.payload.name
			state.password = action.payload.password
			state.role = action.payload.role
		}
	}
})

export const {
	signIn
} = IUserSlice.actions

export default IUserSlice.reducer