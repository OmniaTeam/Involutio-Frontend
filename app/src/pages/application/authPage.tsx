import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux.ts";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSignInMutation } from "../../services/authService.ts";
import {setLogin, setRole } from "../../store/reducers/IUserSlice.ts";
import { EUserRole } from "../../models/IUser.ts";

import grad from "../../assets/gradient.svg";

export default function AuthPage() {
	//@ts-ignore
	const [userLogin, setUserLogin] = useState<string>('')
	//@ts-ignore
	const [userPassword, setUserPassword] = useState<string>('')
	const [signIn, { isSuccess, data }] = useSignInMutation()

	const dispatch = useAppDispatch()

	const navigator = useNavigate()

	const authHandler = () => {
		signIn({
			login: userLogin,
			password: userPassword,
		})
	}

	useEffect(() => {
		console.log(isSuccess)
		if (isSuccess) {
			dispatch(setLogin(userLogin))
			console.log("yees", userLogin, userPassword)
			console.log(data)
			//@ts-ignore
			if (data.role === EUserRole.manager) {
				dispatch(setRole(EUserRole.manager))
				navigator('/application')
			}
			//@ts-ignore
			if (data.role === EUserRole.admin) {
				dispatch(setRole(EUserRole.admin))
				navigator('/application')
			}
			else {
				dispatch(setRole(EUserRole.non))
				navigator('/')
			}
		}
	}, [])

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
						       onChange={(event) => setUserLogin(event.target.value)}
						/>
						<input className={'form--inputs__password'}
						       type="password"
						       placeholder={'password'}
						       onChange={(event) => setUserPassword(event.target.value)}
						/>
					</div>
					<button className={'form--sign'} type={'button'}  onClick={authHandler}>sign_in</button>
				</motion.form>
				<p className={'auth--container__omnia'}>BY OMNIA</p>
			</div>
		</section>
	</main>
}