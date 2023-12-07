import { Link } from "react-router-dom"

interface EmployeeCardProps {
	name : string,
	department : string,
	position : string,
	dismissalProbability : number,
	id: number
}

export default function EmployeeCard(props : EmployeeCardProps) {
	return <div className={"employee-card"}>
		<div className={"employee-card--info"}>
			<p className={"employee-card--info__name"}>{props.name}</p>
			<p className={"employee-card--info__department"}>{props.department}</p>
			<p className={"employee-card--info__position"}>{props.position}</p>
			<p className={"employee-card--info__probability"}>{props.dismissalProbability}%</p>
		</div>
		<Link to={`/application/employee/${props.id}`} className={"employee-card__details"}>подробнее</Link>
	</div>
}