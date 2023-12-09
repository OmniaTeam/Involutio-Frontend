import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import Modal from "../../components/modal";

export default function EmployeePage() {
	const { id } = useParams()

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	return (<>
		<div className={'employee'}>
			<motion.h2 className={'employee--title'}
	           initial={{ opacity: 0 }}
	           animate={{ opacity: 1 }}
	           transition={{ delay: 0.1, duration: 0.5 }}
			>Фамилия Имя Отчество #{id}</motion.h2>
			<div className={'employee--content'}>
				<div className={'statistic'}>
					<motion.p className={'statistic--path'}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>Отдел того-то сего-то</motion.p>
					<motion.p className={'statistic--path'}
			            initial={{ opacity: 0, y: 10 }}
			            animate={{ opacity: 1, y: 0 }}
			            transition={{ duration: 0.5 }}
					>Дироктор по тому-то сему-то</motion.p>
					<motion.p className={'statistic--path'}
			            initial={{ opacity: 0, y: 10 }}
			            animate={{ opacity: 1, y: 0 }}
			            transition={{ duration: 0.5 }}
					>Вероятность увольнения на данный момент равна __%</motion.p>
					<motion.button className={'statistic--button'} type={'button'}
					        onClick={() => setIsModalOpen(true)}
					        initial={{ opacity: 0 }}
					        animate={{ opacity: 1 }}
					        transition={{ delay: 0.2, duration: 0.5 }}
					>Составить отчёт</motion.button>
				</div>
				<div className={'employee--content__graph'}></div>
			</div>
		</div>
		{ isModalOpen && (
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