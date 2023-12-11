import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, EUserRole } from "../../models/IUser";

const initialState : IUser = {
	name : "nothing",
	password : "nothing",
	role : EUserRole.non
}

export const IUserSlice = createSlice({
	name : "user",
	initialState,
	reducers : {
		signIn : (state, action : PayloadAction<IUser>) => {
			state.name = action.payload.name
			state.password = action.payload.password
			state.role = action.payload.role
		},
		setName : (state, action : PayloadAction<string>) => {
			state.name = action.payload
		},
		setRole : (state, action : PayloadAction<EUserRole>) => {
			state.role = action.payload
		}
	}
})

export const {
	signIn,
	setName,
	setRole
} = IUserSlice.actions