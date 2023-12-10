import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface LineInformationCardProps {
	type : string,
	name : string,
	secondColumn : string,
	thirdColumn : string,
	dismissalProbability? : number,
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
			<p className={"line-card--info__name"}>1. {props.name}</p>
			<p className={"line-card--info__second-column"}>2. {props.secondColumn}</p>
			<p className={"line-card--info__third-column"}>3. {props.thirdColumn}</p>
			{props.type === "employee"
				? <p className={"line-card--info__probability"}>4. Вероятность {props.dismissalProbability}%</p>
				: <></>
			}
		</div>
		<Link to={`${props.link}`} className={"line-card__details"}>{props.type === "report" ? "посмотреть" : "подробнее"}</Link>
	</motion.div>
}