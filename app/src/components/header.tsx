import { motion } from "framer-motion";
import { useAppSelector } from "../hooks/redux.ts";

export default function Header() {
	const USER = useAppSelector((state) => state.user)
	return <motion.header className={'header'}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.2 }}
	>
		<div className={'header--container'}>
			<div className={'information'}>
				<h3 className={'information--name'}>{USER.login}</h3>
				<div className={'information--avatar'}>
					<p>{USER.login[0].toUpperCase()}</p>
				</div>
			</div>
		</div>
	</motion.header>
}