import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDepartment } from "../models/IDepartment.ts";
import { IEmployee } from "../models/IEmployee.ts";
import {IStatistic} from "../models/IStatistic.ts";

export const DataService = createApi({
	reducerPath : "data-service",
	baseQuery : fetchBaseQuery({
		baseUrl : "https://involutio.the-omnia.ru/api/v3"
	}),
	endpoints : (build) => ({
		getManager : build.query<IDepartment, any>({
			query : (  ) => ({
				url : `/manager`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET"
			})
		}),
		/*Получение всех отделов и короткой информации по ним*/
		getDepartments : build.query<IDepartment[], any>({
			query : () => ({
				url : "/manager/all",
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
		getEmployees : build.query<IEmployee[], number>({
			query : (managerId) => ({
				url : `/manager/${managerId}/workers`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET"
			})
		}),
		/*Получение подробной информации по сотруднику*/
		getEmployeeInfo : build.query<IEmployee, number>({
			query : (workerId) => ({
				url : `/worker/${workerId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET"
			})
		}),
		/*Получение статистики сотрудника для графика и составления отчёта*/
		getStat : build.query<IStatistic[], { workerId : number, start : string, end : string }>({
			query : (args) => ({
				url : `/worker/${args.workerId}/stat?start=${args.start}&end=${args.end}`,
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
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
	useGetManagerQuery,
	useGetDepartmentsQuery,
	useGetEmployeesQuery,
	useGetEmployeeInfoQuery,
	useGetStatQuery
} = DataService