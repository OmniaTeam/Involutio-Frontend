import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";

import LineInformationCard from "../../components/lineInformationCard.tsx";
import {EUserRole} from "../../models/IUser.ts";

export default function ReportsPage() {
	const USER = useAppSelector((state) => state.user)
	/*TODO: для админа нужно сделать селектор по доступным подразделениям*/
	return <div className={'reports'}>
		<motion.h2 className={'reports--title'}
			initial={{ opacity: 0 }}
		    animate={{ opacity: 1 }}
		    transition={{ delay: 0.1, duration: 0.5 }}
		>Отчёты {USER.role === EUserRole.admin ? "для админа" : "для менеджера"}</motion.h2>
		<div className={'reports--content'}>
			<motion.div className={'attributes'} style={{gridTemplateColumns: "repeat(3, 1fr)"}}
	            initial={{ opacity: 0 }}
	            animate={{ opacity: 1 }}
	            transition={{ duration: 0.5 }}
			>
				<p className={'attributes--path'}>1 - фио сотрудника</p>
				<p className={'attributes--path'}>2 - дата создания отчёта</p>
				<p className={'attributes--path'}>3 - временной период</p>
			</motion.div>
			<div className={'reports--cards'}>
				<LineInformationCard
					type={'report'}
					name={'Иван Иванов Иванович'}
					secondColumn={'8.12.2023-13:12'}
					thirdColumn={'от 1.12.2023 до 8.12.2023'}
					id={1}
					initialY={10}
				/>
				<LineInformationCard
					type={'report'}
					name={'Алексей Смирнов Викторович'}
					secondColumn={'5.12.2023-10:52'}
					thirdColumn={'от 25.11.2023 до 30.11.2023'}
					id={1}
					initialY={15}
				/>
			</div>
		</div>
	</div>
}