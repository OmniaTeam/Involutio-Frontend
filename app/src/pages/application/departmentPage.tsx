import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
import Modal from "../../components/modal.tsx";

export default function DepartmentPage() {
	const managerId = useParams()

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const USER = useAppSelector((state) => state.user)
	const EMPLOYEES = useGetEmployeesQuery(Number(managerId.id))
	const DEPARTMENT = useGetDepartmentInfoQuery(Number(managerId.id))
	const CURATOR = useGetUserInfoQuery(Number(managerId.id))
	const STATISTIC = useGetDepartmentStatQuery({
		departmentId: Number(managerId.id),
		start: "2021-12-24",
		end: "2021-12-31",
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
				>
					{STATISTIC.isSuccess
						? <>
							<Chart data={STATISTIC.data}/>
							<motion.button className={'statistic--button'} type={'button'}
								onClick={() => setIsModalOpen(true)}
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{delay: 0.2, duration: 0.5}}
							>Составить отчёт</motion.button>
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
					<LineInformationCard
						type={'employee'}
						name={'Иван Иванов Иванович'}
						secondColumn={'Менеджер'}
						thirdColumn={"Вероятность 20%"}
						id={1}
						initialY={10}
						link={'/application/employee/1'}
					/>
				</div>
				<motion.p className={'department--content__title'}
				          initial={{opacity: 0}}
				          animate={{opacity: 1}}
				          transition={{delay: 0.1, duration: 0.5}}
				>Сотрудники отдела
				</motion.p>
				<div className={'department--cards'}>
					{EMPLOYEES.isSuccess
						? <>{EMPLOYEES.data.map((value, index) =>
							<div key={index}>
								<LineInformationCard
									type={'employee'}
									name={value.fio}
									secondColumn={value.speciality}
									thirdColumn={`Вероятность ${value.rating}%`}
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
		{isModalOpen && (
			<Modal onClose={() => setIsModalOpen(false)}>
				<h2 className={'modal--title'}>Составить отчёт</h2>
				<div className={'date-range'}>
					<div className={'date-range--start'}>
						<p className={'date-range--label'}>Начальная дата</p>
						<input
							type="date"
							value={startDate}
							className={'date-range--input'}
							onChange={(e) => {
								setStartDate(e.target.value);
							}}
						/>
					</div>
					<div className={'date-range--end'}>
						<p className={'date-range--label'}>Конечная дата</p>
						<input
							type="date"
							value={endDate}
							className={'date-range--input'}
							onChange={(e) => {
								setEndDate(e.target.value);
							}}
						/>
					</div>
				</div>
				<button className={'modal--button'} type={'button'}>сгенерировать</button>
			</Modal>
		)}
	</>)
}