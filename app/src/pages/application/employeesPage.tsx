import { motion } from "framer-motion";

import LineInformationCard from "../../components/lineInformationCard";

export default function EmployeesPage() {
	return <div className={'employees'}>
		<motion.h2 className={'employees--title'}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5 }}
		>Сотрудники</motion.h2>
		<motion.div className={'employees--content'}
	        initial={{ opacity: 0 }}
	        animate={{ opacity: 1 }}
	        transition={{ duration: 0.5 }}
		>
			<div className={'attributes'}>
				<p className={'attributes--path'}>фио</p>
				<p className={'attributes--path'}>отдел</p>
				<p className={'attributes--path'}>должность</p>
				<p className={'attributes--path'}>вероятность</p>
			</div>
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