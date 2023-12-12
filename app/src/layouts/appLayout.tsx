import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux.ts";
import { motion } from "framer-motion";
import { useGetUserQuery } from "../services/authService.ts";
import { useGetManagerQuery } from "../services/dataService.ts";
import { setId, setLogin, setName, setRole } from "../store/reducers/IUserSlice.ts";
import { EUserRole } from "../models/EUserRole.ts";

import Header from "../components/header";
import Sidebar from "../components/sidebar.tsx";

import grad from "../assets/gradient.svg";

export default function AppLayout() {
	const dispatch = useAppDispatch()
	const getUser = useGetUserQuery('')
	const getManager = useGetManagerQuery('')

	useEffect(() => {
		console.log(getUser)
		if (getUser.isSuccess) {
			dispatch(setId(getUser.data.id))
			dispatch(setName(getUser.data.login))
			dispatch(setLogin(getUser.data.fio))
			if (getUser.data.role === 'MANAGER' && getManager.isSuccess) {
				dispatch(setRole(EUserRole.manager))
				dispatch(setId(getManager.data.id))
			}
			if (getUser.data.role === 'ADMIN') dispatch(setRole(EUserRole.admin))
		} else if (getUser) {
			dispatch(setRole(EUserRole.non))
		}
		if (getUser.isError) {
			window.location.href = '/auth'
		}
	}, [getUser])
	return <main className={'application'}>
		<Header/>
		<Sidebar/>
		<motion.img className={'gradient'} src={grad} alt=""
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
		/>
		<section className={'application--section'}>
			<Outlet/>
		</section>
	</main>
}