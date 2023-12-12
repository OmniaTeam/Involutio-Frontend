import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";
import { useGetDepartmentsQuery } from "../../services/dataService.ts";
import { EUserRole } from "../../models/EUserRole.ts";

import LineInformationCard from "../../components/lineInformationCard.tsx";

export default function DepartmentsPage() {
	const USER = useAppSelector((state) => state.user)
	const DEPARTMENTS = useGetDepartmentsQuery('')

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
		<div className={'departments'}>
			<motion.h2 className={'departments--title'}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1, duration: 0.5 }}
			>Отделения</motion.h2>
			<motion.div className={'attributes'}
	            initial={{ opacity: 0 }}
	            animate={{ opacity: 1 }}
	            transition={{ duration: 0.5 }}
			    style={{width: "500px"}}
			>
				<p className={'attributes--path'}>1 - название отделния</p>
				<p className={'attributes--path'}>2 - фио куратора отделения</p>
				<p className={'attributes--path'}>3 - средний процент заинтересованности</p>
			</motion.div>
			<div className={'departments--cards'}>
				{ DEPARTMENTS.isSuccess
					? <>{
					//@ts-ignore
					DEPARTMENTS.data.map((value, index) =>
						<div key={index}>
							<LineInformationCard
								type={'department'}
								name={value.department}
								secondColumn={value.userId.toString()}
								thirdColumn={`Средняя вероятность ${value.rating}%`}
								id={1}
								initialY={10 + (index * 5)}
								link={`/application/department/${value.id}`}
							/>
						</div>
					)}</>
					: <>Не загрузил(</>
				}
			</div>
		</div>
	</>)
}