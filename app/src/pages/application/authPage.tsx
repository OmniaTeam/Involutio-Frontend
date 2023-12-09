import { useState } from "react";
import { motion } from "framer-motion";

import grad from "../../assets/gradient.svg";

export default function AuthPage() {
	//@ts-ignore
	const [login, setLogin] = useState<string>('')
	//@ts-ignore
	const [password, setPassword] = useState<string>('')

	return <main>
		<section className={'auth'}>
			<div className={'auth--container'}>
				<motion.img className={'gradient'} src={grad} alt=""
		            initial={{ opacity: 0, scale: 0.5 }}
		            animate={{ opacity: 1, scale: 1 }}
		            transition={{ duration: 0.5 }}
				/>
				<motion.form className={'form'}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
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
				</motion.form>
				<p className={'auth--container__omnia'}>BY OMNIA</p>
			</div>
		</section>
	</main>
}