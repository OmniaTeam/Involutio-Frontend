import { Outlet } from "react-router-dom";

import Header from "../components/header";
import Sidebar from "../components/sidebar.tsx";

import grad from "../assets/gradient.svg";

export default function AppLayout() {
	return <main className={'application'}>
		<Header/>
		<Sidebar/>
		<img className={'gradient'} src={grad} alt=""/>
		<section className={'application--section'}>
			<Outlet/>
		</section>
	</main>
}