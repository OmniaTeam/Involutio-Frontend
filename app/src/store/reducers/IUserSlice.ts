import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, EUserRole } from "../../models/IUser";

const initialState : IUser = {
	id: 0,
	fio: "nothing",
	login : "nothing",
	role : EUserRole.non
}

export const IUserSlice = createSlice({
	name : "user",
	initialState,
	reducers : {
		setName : (state, action : PayloadAction<string>) => {
			state.fio = action.payload
		},
		setLogin : (state, action : PayloadAction<string>) => {
			state.login = action.payload
		},
		setRole : (state, action : PayloadAction<EUserRole>) => {
			state.role = action.payload
		}
	}
})

export const {
	setName,
	setLogin,
	setRole
} = IUserSlice.actions