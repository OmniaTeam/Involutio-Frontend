import { Link } from "react-router-dom";

export default function IndexPage() {
	return <main>
		<section className={'hero'}>
			<div className={'hero--container'}>
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