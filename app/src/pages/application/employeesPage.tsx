import EmployeeCard from "../../components/employeeCard";

export default function EmployeesPage() {
	return <div className={'employees'}>
		<h2 className={'employees--title'}>Сотрудники</h2>
		<div className={'employees--content'}>
			<div className={'attributes'}>
				<p className={'attributes--path'}>фио</p>
				<p className={'attributes--path'}>отдел</p>
				<p className={'attributes--path'}>должность</p>
				<p className={'attributes--path'}>вероятность</p>
			</div>
			<div className={'employees--cards'}>
				<EmployeeCard
					name="Иван Иванов Иванович"
					department="Отдел продаж"
					position="Менеджер"
					dismissalProbability={20}
					id={1}
				/>
				<EmployeeCard
					name="Алексей Смирнов Викторович"
					department="Отдел разработки"
					position="Старший программист"
					dismissalProbability={5}
					id={2}
				/>
			</div>
		</div>
	</div>
}