import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "../components/header";
import Sidebar from "../components/sidebar.tsx";

import grad from "../assets/gradient.svg";

export default function AppLayout() {
	const role = localStorage.getItem('auth-role')
	return <main className={'application'}>
		<Header/>
		{ role === "manager"
			? <Sidebar/>
			: <Sidebar/>
		}
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