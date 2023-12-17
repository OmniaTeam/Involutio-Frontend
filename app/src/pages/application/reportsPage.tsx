import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {motion} from "framer-motion";
import {useGetDepartmentsQuery, useGetReportsQuery} from "../../services/dataService.ts";
import {clearData, setData} from "../../store/reducers/IReportsSlice.ts";
import {EUserRole} from "../../models/EUserRole.ts";

import LineInformationCard from "../../components/lineInformationCard";
import DropdownMenu from "../../components/dropdownMenu.tsx";

export default function EmployeesPage() {
	const dispatch = useAppDispatch()

	const USER = useAppSelector((state) => state.user);
	const REPORTS = useAppSelector((state) => state.reports)

	const departmentsQuery = useGetDepartmentsQuery("");
	const reportsQuery = useGetReportsQuery('')

	//@ts-ignore
	const [selectedOption, setSelectedOption] = useState<string>("");
	const [selectedId, setSelectedId] = useState<number>(0);

	const options = departmentsQuery.data?.map((value) => ({
		value: value.department,
		label: value.department,
		id: value.id,
	})) || [];

	const getWorkerFio = async (workerId: number) => {
		try {
			const response = await fetch(
				`https://involutio.the-omnia.ru/api/v3/worker/${workerId}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "GET",
				}
			);
			if (response.ok) {
				const data = await response.json();
				return data.fio;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const parseValueFromFileName = (fileName: string): string => {
		const startIndex = fileName.indexOf('_');
		const endIndex = fileName.indexOf('.pdf');
		if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex)
			return fileName.substring(startIndex + 1, endIndex);
		return "";
	}

	const handleOptionSelect = (selectedValue: string) => {
		const selectedDepartment = options.find(
			(option) => option.value === selectedValue
		);
		if (selectedDepartment) {
			console.log("Dep:", selectedDepartment.id)
			if (selectedDepartment.id !== selectedId) {
				dispatch(clearData([]));
			}
			setSelectedOption(selectedValue);
			setSelectedId(selectedDepartment.id);
		}
	};

	useEffect(() => {
		if (USER.role === EUserRole.admin) {
			if (selectedId === 0) {
				dispatch(clearData([]));
			}
		}
		if (USER.role === EUserRole.manager) {
			if (selectedId === 0 || selectedId !== USER.id) {
				dispatch(clearData([]));
				setSelectedId(USER.id);
			}
		}
	}, [selectedId, USER.role, USER.id]);

	useEffect(() => {
		if (reportsQuery.isSuccess) {
			reportsQuery.data.map(async (value) => {
				if (selectedId !== 0 && value.manager_id === selectedId) {
					const workerFio = await getWorkerFio(Number(parseValueFromFileName(value.name)));
					dispatch(
						setData({
							date: value.date,
							id: value.id,
							manager_id: value.manager_id,
							name: value.name,
							processed: value.processed,
							type: value.type,
							worker_fio: String(workerFio),
						})
					);
				}
			})
		}
	}, [reportsQuery, selectedId, USER.role, USER.id]);


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
					{reportsQuery.isSuccess ? (
						<>
							{REPORTS.value.map((value, index) => (
								<div key={index}>
									<LineInformationCard
										type={'report'}
										name={value.worker_fio}
										secondColumn={value.date}
										thirdColumn={
										`от ${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]} 
										до ${new Date().toISOString().split("T")[0]}`}
										id={value.id}
										initialY={10 + (index * 5)}
										link={`https://involutio.the-omnia.ru/api/v3/files/download?fileId=${value.id}`}
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