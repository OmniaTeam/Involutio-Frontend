import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";
import { EUserRole } from "../../models/IUser.ts";

import LineInformationCard from "../../components/lineInformationCard.tsx";

export default function DepartmentPage() {
	const USER = useAppSelector((state) => state.user)

	useEffect(() => {
		console.log(USER.role)
		if (USER.role !== EUserRole.admin) {
			window.location.href = '/'
		}
		else {
			console.log(USER.role)
		}
	}, [])

	return (<>
		<div className={'department'}>
			<motion.h2 className={'department--title'}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1, duration: 0.5 }}
			>Отдел такой-то такой</motion.h2>
			<div className={'department--content'}>
				<motion.p className={'department--content__title'}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1, duration: 0.5 }}
				>Куратор отделеня</motion.p>
				<div className={'department--curator'}></div>
				<motion.p className={'department--content__title'}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1, duration: 0.5 }}
				>Глава отделеня</motion.p>
				<div className={'department--cards'}>
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
				</div>
				<motion.p className={'department--content__title'}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1, duration: 0.5 }}
				>Сотрудники отделеня</motion.p>
				<div className={'department--cards'}>
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
			</div>
		</div>
	</>)
}