import { motion } from "framer-motion";

export default function Header() {
	return <motion.header className={'header'}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.2 }}
	>
		<div className={'header--container'}>
			<div className={'information'}>
				<h3 className={'information--name'}>admin_name</h3>
				<div className={'information--avatar'}>
					<p>A</p>
				</div>
			</div>
		</div>
	</motion.header>
}