import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReport, IReports } from "../../models/IReport.ts";

const initialState : IReports = {
	value : []
}

export const IReportsSlice = createSlice({
	name : "full-departments",
	initialState,
	reducers : {
		setData : (state, action : PayloadAction<IReport>) => {
			state.value.push(action.payload)
		},
		clearData : (state, action : PayloadAction<[]>) => {
			state.value = action.payload
		}
	}
})

export const {
	setData,
	clearData
} = IReportsSlice.actions