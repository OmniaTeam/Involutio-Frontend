import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { IUserSlice } from "./reducers/IUserSlice.ts";
import { AuthService } from "../services/authService";
import { DataService } from "../services/dataService.ts";
import { IDepartmentSlice } from "./reducers/IDepartmentSlice.ts";

const rootReducer = combineReducers({
	[AuthService.reducerPath] : AuthService.reducer,
	user : IUserSlice.reducer,
	[DataService.reducerPath] : DataService.reducer,
	department : IDepartmentSlice.reducer
})

export const setupStore = () => configureStore({
	reducer : rootReducer,
	middleware : (getDefaultMiddleware) => {
		return getDefaultMiddleware().prepend(AuthService.middleware).prepend(DataService.middleware)
	}
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']