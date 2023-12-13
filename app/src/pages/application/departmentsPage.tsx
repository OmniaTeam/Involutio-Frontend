import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";
import { useGetDepartmentsQuery } from "../../services/dataService.ts";
import { EUserRole } from "../../models/EUserRole.ts";

import LineInformationCard from "../../components/lineInformationCard.tsx";

export default function DepartmentsPage() {
	const USER = useAppSelector((state) => state.user);
	const DEPARTMENTS = useGetDepartmentsQuery("");

	const [userNames, setUserNames] = useState<string[]>([]);
	const [deps, setDeps] = useState<{
		id: number,
		userId: number,
		department: string,
		rating: number,
		fio: string
	}[]>([])

	//TODO: привязать fio к Department

	const getUser = async (userId: number) => {
		try {
			const response = await fetch(
				`https://involutio.the-omnia.ru/api/v3/user/${userId}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "GET",
				}
			);
			if (response.ok) {
				const data = await response.json();
				setUserNames((prevUserNames) => [...prevUserNames, data.fio]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (USER.role !== EUserRole.admin) {
			window.location.href = "/";
		}
	}, [USER.role]);

	useEffect(() => {
		if (DEPARTMENTS.isSuccess) {
			const userIds: number[] = DEPARTMENTS.data.map(
				(value) => Number(value.userId)
			);
			userIds.forEach((userId) => getUser(userId));
			setDeps(
				DEPARTMENTS.data.map((value, index) => ({
					id: value.id,
					userId: value.userId,
					department: value.department,
					rating: value.rating,
					fio: userNames[index] || "",
				}))
			);
		}
	}, [DEPARTMENTS, userNames]);

	return (
		<>
			<div className={"departments"}>
				<motion.h2
					className={"departments--title"}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1, duration: 0.5 }}
				>
					Подразделения
				</motion.h2>
				<div className={"heading-wrapper"}>
					<motion.div
						className={"attributes"}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						style={{ width: "500px" }}
					>
						<p className={"attributes--path"}>1 - название отдела</p>
						<p className={"attributes--path"}>2 - фио куратора отдела</p>
						<p className={"attributes--path"}>
							3 - средний процент заинтересованности
						</p>
					</motion.div>
				</div>
				<div className={"departments--cards"}>
					{DEPARTMENTS.isSuccess &&
						deps.map((value, index) => (
							<div key={index}>
								<LineInformationCard
									type={"department"}
									name={value.department}
									secondColumn={value.fio}
									thirdColumn={`Средняя вероятность ${value.rating}%`}
									id={1}
									initialY={10 + index * 5}
									link={`/application/department/${value.id}`}
								/>
							</div>
						))}
				</div>
			</div>
		</>
	);
}