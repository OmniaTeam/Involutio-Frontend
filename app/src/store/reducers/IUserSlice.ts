import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";

const initialState : IUser = {
	name : "",
	password : ""
}

export const IUserSlice = createSlice({
	name : "user",
	initialState,
	reducers : {
		signIn : (state, action : PayloadAction<IUser>) => {
			state.name = action.payload.name
			state.password = action.payload.password
		}
	}
})

export const {
	signIn
} = IUserSlice.actions

export default IUserSlice.reducer