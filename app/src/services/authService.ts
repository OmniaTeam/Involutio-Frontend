import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../models/IUser.ts";

export const AuthService = createApi({
	reducerPath : "auth-service",
	baseQuery : fetchBaseQuery({
		baseUrl : "http://localhost:8000/api"
	}),
	endpoints : (build) => ({
		signIn : build.mutation<IUser, IUser>({
			query : ( auth ) => ({
				url : "/auth",
				headers : {
					"Content-Type": "application/json",
				},
				method: "POST",
				redirect: "follow",
				body: JSON.stringify(auth)
			})
		})
	})
})

export const {
	useSignInMutation,
} = AuthService;