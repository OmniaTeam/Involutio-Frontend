import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";
import { useGetEmployeeInfoQuery, useGetManagerQuery } from "../../services/dataService.ts";
import { EUserRole } from "../../models/EUserRole.ts";

import Modal from "../../components/modal";
import Chart from "../../components/chart.tsx";

export default function EmployeePage() {
	const employeeId = useParams()
	const USER = useAppSelector((state) => state.user)

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const EMPLOYEE = useGetEmployeeInfoQuery(Number(employeeId.id))
	const MANAGER = useGetManagerQuery('')

	const handle = async () => await fetch("https://involutio.the-omnia.ru/api/v3", {
		headers : {
			"Content-Type": "application/json",
		},
		method: "GET"
	})

	console.log(handle())

	return (<>
		<div className={'employee'}>
			{EMPLOYEE.isSuccess
				? <motion.h2 className={'employee--title'}
				             initial={{opacity: 0}}
				             animate={{opacity: 1}}
				             transition={{delay: 0.1, duration: 0.5}}
				>{EMPLOYEE.data.fio}</motion.h2>
				: <>{EMPLOYEE.isLoading
					? <motion.h2 className={'employee--title'}
					             initial={{opacity: 0}}
					             animate={{opacity: 1}}
					             transition={{delay: 0.1, duration: 0.5}}
					>Загрузка...</motion.h2>
					: <motion.h2 className={'employee--title'}
					             initial={{opacity: 0}}
					             animate={{opacity: 1}}
					             transition={{delay: 0.1, duration: 0.5}}
					>Ошибка(</motion.h2>
				}</>
			}
			<div className={'employee--content'}>
				<div className={'statistic'}>
					{USER.role === EUserRole.admin
						? <motion.div className={'statistic--button'}
						              initial={{opacity: 0, y: 10}}
						              animate={{opacity: 1, y: 0}}
							transition={{duration: 0.5}}
						>
							<Link to={'/application/department/1'} style={{
								color: "#FFFFFF",
								fontWeight: "400",
								textUnderlineOffset: "5px"
							}}>
								Отдел того-то сего-то
							</Link>
						</motion.div>
						: <>{MANAGER.isSuccess
							? <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>{MANAGER.data.department}</motion.p>
							: <>{MANAGER.isLoading
								? <motion.p className={'statistic--path'}
								            initial={{opacity: 0, y: 10}}
								            animate={{opacity: 1, y: 0}}
								            transition={{duration: 0.5}}
								>Загрузка</motion.p>
								: <motion.p className={'statistic--path'}
								            initial={{opacity: 0, y: 10}}
								            animate={{opacity: 1, y: 0}}
								            transition={{duration: 0.5}}
								>Ошибка</motion.p>
							}</>
						}</>
					}
					<motion.p className={'statistic--path'}
					          initial={{opacity: 0, y: 10}}
					          animate={{opacity: 1, y: 0}}
					          transition={{duration: 0.5}}
					>Должность</motion.p>
					{EMPLOYEE.isSuccess
						? <motion.p className={'statistic--path'}
						            initial={{opacity: 0, y: 10}}
						            animate={{opacity: 1, y: 0}}
						            transition={{duration: 0.5}}
						>Вероятность увольнения на данный момент равна {EMPLOYEE.data.rating}%</motion.p>
						: <>{EMPLOYEE.isLoading
							? <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>Загрузка</motion.p>
							: <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>Ошибка</motion.p>
						}</>
					}
					{USER.role === EUserRole.manager
						? <motion.button className={'statistic--button'} type={'button'}
						                 onClick={() => setIsModalOpen(true)}
						                 initial={{opacity: 0}}
						                 animate={{opacity: 1}}
						                 transition={{delay: 0.2, duration: 0.5}}
						>Составить отчёт</motion.button>
						: <></>
					}
				</div>
				<div className={'employee--content__graph'}>
					<Chart/>
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