import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetEmployeesQuery } from "../../services/dataService.ts";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";
import { EUserRole } from "../../models/EUserRole.ts";

import LineInformationCard from "../../components/lineInformationCard.tsx";

export default function DepartmentPage() {
	const managerId = useParams()

	const USER = useAppSelector((state) => state.user)
	const EMPLOYEES = useGetEmployeesQuery(Number(managerId.id))

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
				>Куратор отделения</motion.p>
				<div className={'department--curator'}></div>
				<motion.p className={'department--content__title'}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1, duration: 0.5 }}
				>Глава отделения</motion.p>
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
				>Сотрудники отделения</motion.p>
				<div className={'department--cards'}>
					{ EMPLOYEES.isSuccess
						? <>{ EMPLOYEES.data.map((value, index) =>
							<div key={index}>
								<LineInformationCard
									type={'employee'}
									name={value.fio}
									secondColumn={'Отдел'}
									thirdColumn={value.speciality}
									dismissalProbability={value.rating}
									id={value.id}
									initialY={10}
									link={`/application/employee/${value.id}`}
								/>
							</div>
						)}</>
						: <>Не загрузило(</>
					}
				</div>
			</div>
		</div>
	</>)
}