import { useState } from "react";

import grad from "../../assets/gradient.svg";

export default function AuthPage() {
	//@ts-ignore
	const [login, setLogin] = useState<string>('')
	//@ts-ignore
	const [password, setPassword] = useState<string>('')

	return <main>
		<section className={'auth'}>
			<div className={'auth--container'}>
				<img className={'gradient'} src={grad} alt=""/>
				<form className={'form'}>
					<h2 className={'form--title'}>Sign In</h2>
					<div className={'form--inputs'}>
						<input className={'form--inputs__login'}
						       type="text"
						       placeholder={'login'}
						       onChange={(event) => setLogin(event.target.value)}
						/>
						<input className={'form--inputs__password'}
						       type="password"
						       placeholder={'password'}
						       onChange={(event) => setPassword(event.target.value)}
						/>
					</div>
					<button className={'form--sign'} type={'button'}  onClick={() => {
						window.location.href = '/application'
					}}>sign_in</button>
				</form>
				<p className={'auth--container__omnia'}>BY OMNIA</p>
			</div>
		</section>
	</main>
}