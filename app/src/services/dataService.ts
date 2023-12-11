import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {IDepartment} from "../models/IDepartment.ts";

export const DataService = createApi({
	reducerPath : "data-service",
	baseQuery : fetchBaseQuery({
		baseUrl : "https://involutio.the-omnia.ru/api/v3"
	}),
	endpoints : (build) => ({
		/*Получение всех отделов и короткой информации по ним*/
		getDepartments : build.query<IDepartment[], any>({
			query : () => ({
				url : "",
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET"
			})
		}),
		/*Получение подробной информации по отделу?*/
		getDepartmentInfo : build.query<any, any>({
			query : () => ({
				url : ""
			})
		}),
		/*Получение всех сотрудников по отделу с короткой информацией*/
		getEmployees : build.query<any, any>({
			query : () => ({
				url : ""
			})
		}),
		/*Получение подробной информации по сотруднику*/
		getEmployeeInfo : build.query<any, any>({
			query : () => ({
				url : ""
			})
		}),
		/*Получение статистики сотрудника для графика и составления отчёта*/
		getStat : build.query<any, any>({
			query : () => ({
				url : ""
			})
		}),
		/*Получение ссылок на все отчёты по отделу*/
		getReports : build.query<any, any>({
			query : () => ({
				url : ""
			})
		}),
		/*Создание отчёта пользователя или */
		createReport : build.mutation<any, any>({
			query : () => ({
				url : ""
			})
		})
	})
})

export const {
	useGetDepartmentsQuery
} = DataService