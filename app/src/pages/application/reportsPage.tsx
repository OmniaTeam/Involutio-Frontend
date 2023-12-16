import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";
import {useGetDepartmentsQuery, useGetReportsQuery} from "../../services/dataService.ts";
import { EUserRole } from "../../models/EUserRole.ts";

import LineInformationCard from "../../components/lineInformationCard";
import DropdownMenu from "../../components/dropdownMenu.tsx";

export default function EmployeesPage() {
	const USER = useAppSelector((state) => state.user);
	const DEPARTMENTS = useGetDepartmentsQuery("");

	//@ts-ignore
	const [selectedOption, setSelectedOption] = useState<string>("");
	//@ts-ignore
	const [selectedId, setSelectedId] = useState<number>(0);

	const REPORTS = useGetReportsQuery('')

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

	//TODO: написать ролевое разделение. Менеджер видит отчёты всех своих сотрудников, а админ отчёты всех отедлов

	return (
		<div className={"reports"}>
			<motion.h2
				className={"reports--title"}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1, duration: 0.5 }}
			>
				Отчёты{" "}
				{USER.role === EUserRole.admin ? "для админа" : "для менеджера"}
			</motion.h2>
			<motion.div
				className={"reports--content"}
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
						<p className={"attributes--path"}>2 - дата создания отчёта</p>
						<p className={"attributes--path"}>3 - временной период</p>
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
				<div className={"reports--cards"}>
					{REPORTS.isSuccess ? (
						<>
							{REPORTS.data.map((value, index) => (
								<div key={index}>
									<LineInformationCard
										type={'report'}
										name={'Иван Иванов Иванович'}
										secondColumn={value.date}
										thirdColumn={'от 1.12.2023 до 8.12.2023'}
										id={1}
										initialY={10 + (index * 5)}
										link={`https://involutio.the-omnia.ru/api/v3/files/download?fileId=${value.id}}`}
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