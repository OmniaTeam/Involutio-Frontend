import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux.ts";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signIn } from "../../store/reducers/IUserSlice.ts";
import { IUserRole } from "../../models/IUser.ts";

import grad from "../../assets/gradient.svg";

export default function AuthPage() {
	//@ts-ignore
	const [login, setLogin] = useState<string>('')
	//@ts-ignore
	const [password, setPassword] = useState<string>('')

	const navigator = useNavigate()

	const dispatch = useAppDispatch()

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
						if (login === "manager" && password === "manager") {
							dispatch(signIn({
								name: login,
								password: password,
								role: IUserRole.manager
							}))
							navigator('/application')
						}
						if (login === "admin" && password === "admin") {
							dispatch(signIn({
								name: login,
								password: password,
								role: IUserRole.admin
							}))
							navigator('/application')
						}
						else {
							console.log(login, password)
						}
					}}>sign_in</button>
				</motion.form>
				<p className={'auth--container__omnia'}>BY OMNIA</p>
			</div>
		</section>
	</main>
}