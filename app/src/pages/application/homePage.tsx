import { motion } from "framer-motion"

export default function HomePage() {
	return <div className={'home'}>
		<motion.h2 className={'home--title'}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5 }}
		>Обзор</motion.h2>
	</div>
}