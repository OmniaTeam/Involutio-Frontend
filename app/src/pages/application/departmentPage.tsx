import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
	useGetDepartmentInfoQuery,
	useGetEmployeesQuery,
	useGetDepartmentStatQuery,
	useGetUserInfoQuery
} from "../../services/dataService.ts";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";
import { EUserRole } from "../../models/EUserRole.ts";

import LineInformationCard from "../../components/lineInformationCard.tsx";
import Chart from "../../components/chart.tsx";

export default function DepartmentPage() {
	const managerId = useParams()

	const USER = useAppSelector((state) => state.user)
	const EMPLOYEES = useGetEmployeesQuery(Number(managerId.id))
	const DEPARTMENT = useGetDepartmentInfoQuery(Number(managerId.id))
	const CURATOR = useGetUserInfoQuery(Number(managerId.id))
	const STATISTIC = useGetDepartmentStatQuery({
		departmentId: Number(managerId.id),
		start: // Update the start date to 7 days ago
			new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
		end: // Update the end date to today
			new Date().toISOString().split("T")[0],
	});

	useEffect(() => {
		if (USER.role !== EUserRole.admin) window.location.href = '/'
	}, [])

	return (<>
		<div className={'department'}>
			{DEPARTMENT.isSuccess
				? <motion.h2 className={'department--title'}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{delay: 0.1, duration: 0.5}}
				>{DEPARTMENT.data.department}</motion.h2>
				: <>{DEPARTMENT.isLoading
					? <motion.h2 className={'department--title'}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{delay: 0.1, duration: 0.5}}
					>Загрузка...</motion.h2>
					: <motion.h2 className={'department--title'}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{delay: 0.1, duration: 0.5}}
					>Не удалось загрузить</motion.h2>
				}</>
			}
			<div className={'department--content'}>
				<motion.p className={'department--content__title'}
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{delay: 0.1, duration: 0.5}}
				>Статистика отдела
				</motion.p>
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{delay: 0.1, duration: 0.5}}
					style={{
						display: "flex",
						gap: "20px",
						flexWrap: "wrap",
						alignItems: "flex-start"
					}}
				>
					{STATISTIC.isSuccess
						? <>
							<Chart data={STATISTIC.data}/>
						</>
						: <>{STATISTIC.isLoading
							? <>Загрузка...</>
							: <>Не удалось загрузить данные</>
						}</>
					}
				</motion.div>
				<motion.p className={'department--content__title'}
				          initial={{opacity: 0}}
				          animate={{opacity: 1}}
				          transition={{delay: 0.1, duration: 0.5}}
				>Куратор отдела
				</motion.p>
				{CURATOR.isSuccess
					? <motion.p className={'statistic--path'}
					            initial={{opacity: 0}}
					            animate={{opacity: 1}}
					            transition={{delay: 0.1, duration: 0.5}}
					            style={{
						            width: "100px",
						            textAlign: "center"
					            }}
					>
						{CURATOR.data.fio}
					</motion.p>
					: <>{CURATOR.isLoading
						? <motion.p className={'statistic--path'}
						            initial={{opacity: 0}}
						            animate={{opacity: 1}}
						            transition={{delay: 0.1, duration: 0.5}}
						            style={{
							            width: "100px",
							            textAlign: "center"
						            }}
						>
							Загрузка...
						</motion.p>
						: <></>
					}</>
				}
				<motion.p className={'department--content__title'}
				          initial={{opacity: 0}}
				          animate={{opacity: 1}}
				          transition={{delay: 0.1, duration: 0.5}}
				>Глава отдела
				</motion.p>
				<div className={'department--cards'}>
					{EMPLOYEES.isSuccess
						? <>{EMPLOYEES.data.map((value) => <>{
							value.speciality === "Lead"
								? <LineInformationCard
									type={'employee'}
									name={value.fio}
									secondColumn={value.speciality}
									thirdColumn={`Вероятность ${value.rating}%`}
									id={value.id}
									initialY={10}
									link={`/application/employee/${value.id}`}
								/>
								: <></>
						}</>)}</>
						: <>{EMPLOYEES.isLoading
							? <>Загрузка</>
							: <>Ошибка загрузки</>
						}</>
					}
				</div>
				<motion.p className={'department--content__title'}
				          initial={{opacity: 0}}
				          animate={{opacity: 1}}
				          transition={{delay: 0.1, duration: 0.5}}
				>Сотрудники отдела
				</motion.p>
				<div className={'department--cards'}>
					{EMPLOYEES.isSuccess
						? <>{EMPLOYEES.data.map((value) =>
							<>
								{value.speciality === "Lead"
									? <></>
									: <LineInformationCard
										type={'employee'}
										name={value.fio}
										secondColumn={value.speciality}
										thirdColumn={`Вероятность ${value.rating}%`}
										id={value.id}
										initialY={10}
										link={`/application/employee/${value.id}`}
									/>
								}
							</>
						)}</>
						: <>Не загрузило(</>
					}
				</div>
			</div>
		</div>
	</>)
}