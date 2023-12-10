import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../hooks/redux.ts";
import { IUserRole } from "../models/IUser.ts";

import Header from "../components/header";
import Sidebar from "../components/sidebar.tsx";

import grad from "../assets/gradient.svg";

export default function AppLayout() {
	const USER = useAppSelector((state) => state.user)
	useEffect(() => {
		if (USER.role === IUserRole.non) window.location.href = '/auth'
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