import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

export default function Chart() {
	const data = [
		{
			date: '01.12',
			probability: 10,
		},
		{
			date: '02.12',
			probability: 25,
		},
		{
			date: '03.12',
			probability: 20,
		},
		{
			date: '04.12',
			probability: 32,
		},
		{
			date: '05.12',
			probability: 58,
		},
		{
			date: '06.12',
			probability: 83,
		},
		{
			date: '07.12',
			probability: 72,
		},
	];
	return (
		<motion.div className={'employee-chart'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
		>
			<p className={'employee-chart--title'}>Динамика вероятности увольнения за последнюю неделю</p>
			<ResponsiveContainer width={800} height={300}>
				<LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
					<XAxis dataKey="date" stroke={"#FFFFFF"} tickLine={false} axisLine={false} width={100}/>
					<YAxis stroke={"#FFFFFF"} tickLine={false} axisLine={false} height={100}/>
					<Tooltip />
					<Line dataKey="probability" fill="none" stroke={"#FFFFFF"} dot={false}/>
				</LineChart>
			</ResponsiveContainer>
		</motion.div>
	);
}