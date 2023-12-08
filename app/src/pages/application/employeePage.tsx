import {useParams} from "react-router-dom";

export default function EmployeePage() {
	const { id } = useParams()

	return <div className={'employee'}>
		{ id }
	</div>
}