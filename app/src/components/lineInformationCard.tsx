import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface LineInformationCardProps {
	type : string,
	name : string,
	secondColumn : string,
	thirdColumn? : string,
	link? : string,
	id: number,
	initialY: number
}

export default function LineInformationCard(props : LineInformationCardProps) {
	return <motion.div className={"line-card"}
		initial={{ y: props.initialY, opacity: 0 }}
		animate={{ y: 0, opacity: 1}}
		transition={{ duration: 0.5 }}
	>
		<div className={"line-card--info"}
		     style={props.type === "employee" ? {gridTemplateColumns: "repeat(4, 1fr)"} : {}}>
			<p className={"line-card--info__name"}>{props.name}</p>
			<p className={"line-card--info__third-column"}>{props.secondColumn}</p>
			<p className={"line-card--info__probability"}>{props.thirdColumn}</p>
		</div>
		<Link to={`${props.link}`} className={"line-card__details"}>{props.type === "report" ? "посмотреть" : "подробнее"}</Link>
	</motion.div>
}