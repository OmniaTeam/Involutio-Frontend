import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux";
import {
	useGetDepartmentInfoQuery,
	useGetEmployeeInfoQuery,
	useGetStatQuery,
} from "../../services/dataService";
import { EUserRole } from "../../models/EUserRole";

import Modal from "../../components/modal";
import Chart from "../../components/chart";

export default function EmployeePage() {
	const { id } = useParams();
	const employeeId = Number(id);
	const USER = useAppSelector((state) => state.user);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const EMPLOYEE = useGetEmployeeInfoQuery(employeeId);

	let MANAGER;
	if (USER.role === EUserRole.manager) {
		MANAGER = useGetDepartmentInfoQuery(USER.id);
	} else {
		if (USER.role === EUserRole.admin && EMPLOYEE.isSuccess)
			MANAGER = useGetDepartmentInfoQuery(EMPLOYEE.data.managerId || -1);
	}

	const STAT = useGetStatQuery({
		workerId: employeeId,
		start: "2021-12-24",
		end: "2021-12-31",
	});

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
							{MANAGER?.isSuccess
								? <Link to={`/application/department/${MANAGER.data.id}`} style={{
									color: "#FFFFFF",
									fontWeight: "400",
									textUnderlineOffset: "5px"
								}}>
									{MANAGER.data.department}
								</Link>
								: <>{ MANAGER?.isLoading
									? <>Загрузка...</>
									: <>Не удалось загрузить</>
								}</>
							}
						</motion.div>
						: <>{MANAGER?.isSuccess
							? <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>{MANAGER.data.department}</motion.p>
							: <>{MANAGER?.isLoading
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
					{EMPLOYEE.isSuccess
						? <motion.p className={'statistic--path'}
						            initial={{opacity: 0, y: 10}}
						            animate={{opacity: 1, y: 0}}
						            transition={{duration: 0.5}}
						>{EMPLOYEE.data.speciality}</motion.p>
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
					{EMPLOYEE.isSuccess
						? <motion.p className={'statistic--path'}
						            initial={{opacity: 0, y: 10}}
						            animate={{opacity: 1, y: 0}}
						            transition={{duration: 0.5}}
						>Адрес электронной почты {EMPLOYEE.data.mail}</motion.p>
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
					{STAT.isSuccess
						? <Chart data={STAT.data}/>
						: <>{STAT.isLoading
							? <>Загрузка...</>
							: <>Ошибка</>
						}</>
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