import grad from "../../assets/gradient.svg";

export default function AuthPage() {
	return <main>
		<section className={'auth'}>
			<img className={'gradient'} src={grad} alt=""/>
			<div className={'auth--container'}>
				<form className={'form'}>
					<h2 className={'form--title'}>Sign In</h2>
					<div className={'form--inputs'}>
						<input className={'form--inputs__login'} type="text" placeholder={'login'}/>
						<input className={'form--inputs__password'} type="password" placeholder={'password'}/>
					</div>
					<button className={'form--sign'}>sign_in</button>
				</form>
				<p className={'auth--container__omnia'}>BY OMNIA</p>
			</div>
		</section>
	</main>
}