import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { IUserSlice } from "./reducers/IUserSlice.ts";
import { AuthService } from "../services/authService";

const rootReducer = combineReducers({
	[AuthService.reducerPath] : AuthService.reducer,
	user : IUserSlice
})

export const setupStore = () => configureStore({
	reducer : rootReducer,
	middleware : (getDefaultMiddleware) => {
		return getDefaultMiddleware().prepend(AuthService.middleware)
	}
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']