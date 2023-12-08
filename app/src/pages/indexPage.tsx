import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import grad from '../assets/gradient.svg'

export default function IndexPage() {
	return <main>
		<section className={'hero'}>
			<div className={'hero--container'}>
				<motion.img className={'gradient'} src={grad} alt=""
		            initial={{ opacity: 0, scale: 0.5 }}
		            animate={{ opacity: 1, scale: 1 }}
		            transition={{ duration: 0.5 }}
				/>
				<div className={'heading'}>
					<h1 className={'heading--title'}>Involutio</h1>
					<p className={'heading--description'}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
				</div>
				<Link className={'hero--container__button'} to={'/auth'}>Try It</Link>
				<p className={'hero--container__omnia'}>BY OMNIA</p>
			</div>
		</section>
	</main>
}