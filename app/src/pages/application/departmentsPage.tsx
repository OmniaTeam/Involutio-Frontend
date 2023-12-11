import { motion } from "framer-motion";
import LineInformationCard from "../../components/lineInformationCard.tsx";
import {useEffect} from "react";
import {EUserRole} from "../../models/IUser.ts";
import {useAppSelector} from "../../hooks/redux.ts";

export default function DepartmentsPage() {
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
				<p className={'attributes--path'}>2 - фио главы отеделения</p>
				<p className={'attributes--path'}>3 - средний процент заинтерисованности</p>
			</motion.div>
			<div className={'departments--cards'}>
				<LineInformationCard
					type={'department'}
					name={'Отдел разработки'}
					secondColumn={'Фамилия Имя Отчество'}
					thirdColumn={'Средняя вероятность 20%'}
					id={1}
					initialY={10}
					link={'/application/department/1'}
				/>
				<LineInformationCard
					type={'department'}
					name={'Отдел маркетинга'}
					secondColumn={'Фамилия Имя Отчество'}
					thirdColumn={'Средняя вероятность 15%'}
					id={2}
					initialY={10}
					link={'/application/department/2'}
				/>
				<LineInformationCard
					type={'department'}
					name={'Юридический отдел'}
					secondColumn={'Фамилия Имя Отчество'}
					thirdColumn={'Средняя вероятность 32%'}
					id={3}
					initialY={10}
					link={'/application/department/2'}
				/>
			</div>
		</div>
	</>)
}