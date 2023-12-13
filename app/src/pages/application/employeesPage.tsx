import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";
import {
	useGetDepartmentsQuery,
	useGetEmployeesQuery,
} from "../../services/dataService.ts";
import { EUserRole } from "../../models/EUserRole.ts";

import LineInformationCard from "../../components/lineInformationCard";
import DropdownMenu from "../../components/dropdownMenu.tsx";

export default function EmployeesPage() {
	const USER = useAppSelector((state) => state.user);
	const DEPARTMENTS = useGetDepartmentsQuery("");

	//@ts-ignore
	const [selectedOption, setSelectedOption] = useState<string>("");
	const [selectedId, setSelectedId] = useState<number>(0);

	let EMPLOYEES;
	if (USER.role === EUserRole.manager) EMPLOYEES = useGetEmployeesQuery(USER.id);
	else EMPLOYEES = useGetEmployeesQuery(selectedId || -1);

	const options = DEPARTMENTS.data?.map((value) => ({
		value: value.department,
		label: value.department,
		id: value.id,
	})) || [];

	const handleOptionSelect = (selectedValue: string) => {
		const selectedDepartment = options.find(
			(option) => option.value === selectedValue
		);
		if (selectedDepartment) {
			setSelectedOption(selectedValue);
			setSelectedId(selectedDepartment.id);
		}
	};

	//TODO: Написать сортировку по разным атрибутам

	return (
		<div className={"employees"}>
			<motion.h2
				className={"employees--title"}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1, duration: 0.5 }}
			>
				Сотрудники{" "}
				{USER.role === EUserRole.admin ? "для админа" : "для менеджера"}
			</motion.h2>
			<motion.div
				className={"employees--content"}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className={"heading-wrapper"}>
					<motion.div
						className={"attributes"}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<p className={"attributes--path"}>1 - фио сотрудника</p>
						<p className={"attributes--path"}>2 - должность</p>
						<p className={"attributes--path"}>3 - вероятность увольнения</p>
					</motion.div>
					{USER.role !== EUserRole.admin ? (
						<></>
					) : (
						<DropdownMenu
							defaultSelected={"Выберите отдел"}
							options={options}
							onSelectOption={handleOptionSelect}
						/>
					)}
				</div>
				<div className={"employees--cards"}>
					{EMPLOYEES.isSuccess && EMPLOYEES.data.length > 0 ? (
						<>
							{EMPLOYEES.data.map((value, index) => (
								<div key={index}>
									<LineInformationCard
										type={"employee"}
										name={value.fio}
										secondColumn={value.speciality}
										thirdColumn={`Вероятность ${value.rating}%`}
										id={value.id}
										initialY={10 + index * 5}
										link={`/application/employee/${value.id}`}
									/>
								</div>
							))}
						</>
					) : (
						<></>
					)}
				</div>
			</motion.div>
		</div>
	);
}