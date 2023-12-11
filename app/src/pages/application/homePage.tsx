import { motion } from "framer-motion"
import { useAppSelector } from "../../hooks/redux.ts";
import { EUserRole } from "../../models/IUser.ts";

export default function HomePage() {
	const USER = useAppSelector((state) => state.user)
	return <div className={'home'}>
		<motion.h2 className={'home--title'}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.1, duration: 0.5 }}
		>Обзор {USER.role === EUserRole.admin ? "для админа" : "для менеджера"}</motion.h2>
	</div>
}