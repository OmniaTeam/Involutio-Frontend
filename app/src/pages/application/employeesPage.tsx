import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";
import { IUserRole } from "../../models/IUser.ts";

import LineInformationCard from "../../components/lineInformationCard";

export default function EmployeesPage() {
	const USER = useAppSelector((state) => state.user)
	/*TODO: для админа нужно сделать селектор по доступным подразделениям*/
	return <div className={'employees'}>
		<motion.h2 className={'employees--title'}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.1, duration: 0.5 }}
		>Сотрудники {USER.role === IUserRole.admin ? "для админа" : "для менеджера"} </motion.h2>
		<motion.div className={'employees--content'}
	        initial={{ opacity: 0 }}
	        animate={{ opacity: 1 }}
	        transition={{ duration: 0.5 }}
		>
			<motion.div className={'attributes'}
	            initial={{ opacity: 0 }}
	            animate={{ opacity: 1 }}
	            transition={{ duration: 0.5 }}
			>
				<p className={'attributes--path'}>1 - фио сотрудника</p>
				<p className={'attributes--path'}>2 - отдел</p>
				<p className={'attributes--path'}>3 - должность</p>
				<p className={'attributes--path'}>4 - вероятность увольнения</p>
			</motion.div>
			<div className={'employees--cards'}>
				<LineInformationCard
					type={'employee'}
					name={'Иван Иванов Иванович'}
					secondColumn={'Отдел продаж'}
					thirdColumn={'Менеджер'}
					dismissalProbability={20}
					id={1}
					initialY={10}
					link={'/application/employee/1'}
				/>
				<LineInformationCard
					type={'employee'}
					name={'Алексей Смирнов Викторович'}
					secondColumn={'Отдел разработки'}
					thirdColumn={'Старший программист'}
					dismissalProbability={5}
					id={2}
					initialY={15}
					link={'/application/employee/2'}
				/>
			</div>
		</motion.div>
	</div>
}