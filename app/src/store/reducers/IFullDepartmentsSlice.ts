import { IFullDepartment, IFullDepartments } from "../../models/IFullDepartment.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : IFullDepartments = {
	value : []
}

export const IFullDepartmentsSlice = createSlice({
	name : "full-departments",
	initialState,
	reducers : {
		setData : (state, action : PayloadAction<IFullDepartment>) => {
			state.value.push(action.payload)
		}
	}
})

export const {
	setData
} = IFullDepartmentsSlice.actions