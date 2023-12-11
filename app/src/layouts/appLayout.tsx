import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { motion } from "framer-motion";
import { useGetUserQuery } from "../services/authService.ts";
import { setName, setRole } from "../store/reducers/IUserSlice.ts";
import { EUserRole } from "../models/IUser.ts";

import Header from "../components/header";
import Sidebar from "../components/sidebar.tsx";

import grad from "../assets/gradient.svg";

export default function AppLayout() {
	const USER = useAppSelector((state) => state.user)
	const dispatch = useAppDispatch()
	const getUser = useGetUserQuery('')

	useEffect(() => {
		console.log(getUser)
		if (getUser.isSuccess) {
			dispatch(setName(getUser.data.login))
			if (getUser.data.role === 'MANAGER') dispatch(setRole(EUserRole.manager))
			if (getUser.data.role === 'ADMIN') dispatch(setRole(EUserRole.admin))
		} else {
			dispatch(setRole(EUserRole.non))
		}
	}, [getUser])
	useEffect(() => {
		console.log(USER)
		/*if (USER.role === EUserRole.non) window.location.href = '/auth'*/
	}, [])
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