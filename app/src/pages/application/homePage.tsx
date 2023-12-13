import { motion } from "framer-motion"
import { useAppSelector } from "../../hooks/redux.ts";
import { Link } from "react-router-dom";
import { EUserRole } from "../../models/EUserRole.ts";

export default function HomePage() {
	const USER = useAppSelector((state) => state.user)

	//TODO: написать что-то привественное для админа и менеджера
	return <div className={'home'}>
		<motion.h2 className={'home--title'}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.1, duration: 0.5 }}
		>Обзор</motion.h2>
		<div className={'home--content'}>
			{USER.role === EUserRole.manager
				? <>
					<motion.h2
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.1, duration: 0.5 }}
					>Привет, {USER.fio}</motion.h2>
					<div className={'statistic'} style={{
						width: "100%"
					}}>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.5 }}
						>
							<Link to={'/application/employees'} className={'statistic--path'}>Посмотреть своих сотрудников</Link>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.5 }}
						>
							<Link to={'/application/employees'} className={'statistic--path'}>Посмотреть отчёты отдела</Link>
						</motion.div>
					</div>
				</>
				: <></>
			}
		</div>
	</div>
}