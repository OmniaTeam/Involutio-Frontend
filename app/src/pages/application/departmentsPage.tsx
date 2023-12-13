import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";
import { useGetDepartmentsQuery } from "../../services/dataService.ts";
import { useGetUserQuery } from "../../services/authService.ts";
import { IUser } from "../../models/IUser.ts";
import { EUserRole } from "../../models/EUserRole.ts";

import LineInformationCard from "../../components/lineInformationCard.tsx";

export default function DepartmentsPage() {
	const USER = useAppSelector((state) => state.user);
	const DEPARTMENTS = useGetDepartmentsQuery("");

	/*const getUser = async ( userId : number ) => {
		await fetch(`https://involutio.the-omnia.ru/api/v3/user/${userId}`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET"
		}).then((result) => {
			if (result.ok) {
				result.json().then((data) => {
					return data.fio
				})
			}
		})
	}*/

	let getUserQuery;
	let arr: IUser[] = []
	useEffect(() => {
		if (DEPARTMENTS.isSuccess) {
			DEPARTMENTS.data.map((value) => {
				getUserQuery = useGetUserQuery(value.userId)
				if (getUserQuery.isSuccess) {
					arr.push(getUserQuery.data)
				}
			})
			console.log(arr)
		}
	}, [DEPARTMENTS]);

	useEffect(() => {
		if (USER.role !== EUserRole.admin) window.location.href = "/";
	}, []);

	return (
		<>
			<div className={"departments"}>
				<motion.h2
					className={"departments--title"}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1, duration: 0.5 }}
				>
					Отделения
				</motion.h2>
				<div className={"heading-wrapper"}>
					<motion.div
						className={"attributes"}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						style={{ width: "500px" }}
					>
						<p className={"attributes--path"}>1 - название отделния</p>
						<p className={"attributes--path"}>2 - фио куратора отделения</p>
						<p className={"attributes--path"}>
							3 - средний процент заинтересованности
						</p>
					</motion.div>
				</div>
				<div className={"departments--cards"}>
					{DEPARTMENTS.isSuccess ? (
						<>
							{DEPARTMENTS.data.map((value, index) => (
								<div key={index}>
									<LineInformationCard
										type={"department"}
										name={value.department}
										secondColumn={''}
										thirdColumn={`Средняя вероятность ${value.rating}%`}
										id={1}
										initialY={10 + index * 5}
										link={`/application/department/${value.id}`}
									/>
								</div>
							))}
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
}