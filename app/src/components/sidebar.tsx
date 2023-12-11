import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { useAppSelector } from "../hooks/redux.ts";
import { useLogOutQuery } from "../services/authService.ts";
import { EUserRole } from "../models/IUser.ts";

export default function Sidebar() {
	const USER = useAppSelector((state) => state.user)
	const logOut = useLogOutQuery('')
	return (<>
		<motion.nav className={'sidebar'}
	        initial={{ opacity: 0 }}
	        animate={{ opacity: 1 }}
	        transition={{ duration: 0.2 }}
		>
			<div className={'sidebar--container'}>
				<p className={'sidebar--container__name'}>Involutio</p>
				<div className={'navigation'}>
					{/*<div className={'navigation--line'}/>*/}
					<Link to={''} className={'navigation--link'}>
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
							<path d="M21.1991 2.77319C20.9722 2.5962 20.6928 2.50007 20.4051 2.50007C20.1174 2.50007
							19.838 2.5962 19.6112 2.77319L1.25 17.0915L2.83789 19.0997L5.08333 17.3489V33.1667C5.08472
							33.844 5.35441 34.4932 5.83337 34.9722C6.31233 35.4512 6.96154 35.7208 7.63889
							35.7222H33.1944C33.8718 35.721 34.5211 35.4513 35.0001 34.9723C35.4791 34.4934 35.7487
							33.8441 35.75 33.1667V17.3606L37.9954 19.1111L39.5833 17.1027L21.1991 2.77319ZM22.9722
							33.1667H17.8611V22.9444H22.9722V33.1667ZM25.5278 33.1667V22.9444C25.527 22.2669 25.2575
							21.6173 24.7784 21.1383C24.2993 20.6592 23.6498 20.3897 22.9722 20.3889H17.8611C17.1835
							20.3896 16.5339 20.659 16.0548 21.1381C15.5757 21.6173 15.3062 22.2669 15.3056
							22.9444V33.1667H7.63889V15.3564L20.4167 5.40247L33.1944 15.3698V33.1667H25.5278Z"/>
						</svg>
					</Link>
					{ USER.role === EUserRole.admin
						? <>
							<Link to={'departments'} className={'navigation--link'}>
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
								     fill="none">
									<g clipPath="url(#clip0_61_101)">
										<path fillRule="evenodd" clipRule="evenodd"
										      d="M24.9994 9.50093C24.9997 10.6386 24.6473 11.7484 23.9907 12.6775C23.3341 13.6065 22.4056 14.3092 21.3331 14.6887V18.6666H26.8325C28.291 18.6666 29.6898 19.246 30.7212 20.2773C31.7525 21.3086 32.3319 22.7074 32.3319 24.166V26.3107C33.5555 26.7432 34.5868 27.5943 35.2436 28.7136C35.9003 29.8329 36.1402 31.1484 35.9208 32.4275C35.7014 33.7066 35.0369 34.8669 34.0447 35.7034C33.0525 36.5399 31.7965 36.9988 30.4988 36.9988C29.201 36.9988 27.945 36.5399 26.9528 35.7034C25.9606 34.8669 25.2961 33.7066 25.0767 32.4275C24.8573 31.1484 25.0972 29.8329 25.754 28.7136C26.4107 27.5943 27.442 26.7432 28.6656 26.3107V24.166C28.6656 23.6798 28.4725 23.2135 28.1287 22.8697C27.785 22.526 27.3187 22.3328 26.8325 22.3328H12.1675C11.6813 22.3328 11.215 22.526 10.8713 22.8697C10.5275 23.2135 10.3344 23.6798 10.3344 24.166V26.3107C11.558 26.7432 12.5893 27.5943 13.246 28.7136C13.9028 29.8329 14.1427 31.1484 13.9233 32.4275C13.7039 33.7066 13.0394 34.8669 12.0472 35.7034C11.055 36.5399 9.799 36.9988 8.50123 36.9988C7.20346 36.9988 5.94747 36.5399 4.95528 35.7034C3.96308 34.8669 3.29856 33.7066 3.07918 32.4275C2.8598 31.1484 3.09969 29.8329 3.75643 28.7136C4.41318 27.5943 5.4445 26.7432 6.6681 26.3107V24.166C6.6681 22.7074 7.2475 21.3086 8.27883 20.2773C9.31017 19.246 10.709 18.6666 12.1675 18.6666H17.6669V14.6887C16.7157 14.3529 15.8752 13.7621 15.2373 12.9809C14.5993 12.1996 14.1883 11.258 14.0494 10.259C13.9104 9.25997 14.0488 8.24197 14.4495 7.31629C14.8501 6.39061 15.4975 5.59289 16.3209 5.01033C17.1443 4.42777 18.112 4.0828 19.1182 4.01314C20.1245 3.94348 21.1305 4.1518 22.0263 4.61533C22.9221 5.07887 23.6733 5.77977 24.1976 6.64142C24.722 7.50306 24.9993 8.49228 24.9994 9.50093ZM19.5 7.6678C19.0138 7.6678 18.5476 7.86093 18.2038 8.20471C17.86 8.54849 17.6669 9.01475 17.6669 9.50093C17.6669 9.98711 17.86 10.4534 18.2038 10.7971C18.5476 11.1409 19.0138 11.3341 19.5 11.3341C19.9862 11.3341 20.4524 11.1409 20.7962 10.7971C21.14 10.4534 21.3331 9.98711 21.3331 9.50093C21.3331 9.01475 21.14 8.54849 20.7962 8.20471C20.4524 7.86093 19.9862 7.6678 19.5 7.6678ZM8.50123 29.6653C8.01505 29.6653 7.54879 29.8585 7.20501 30.2023C6.86123 30.546 6.6681 31.0123 6.6681 31.4985C6.6681 31.9846 6.86123 32.4509 7.20501 32.7947C7.54879 33.1385 8.01505 33.3316 8.50123 33.3316C8.9874 33.3316 9.45367 33.1385 9.79745 32.7947C10.1412 32.4509 10.3344 31.9846 10.3344 31.4985C10.3344 31.0123 10.1412 30.546 9.79745 30.2023C9.45367 29.8585 8.9874 29.6653 8.50123 29.6653ZM30.4988 29.6653C30.0126 29.6653 29.5463 29.8585 29.2025 30.2023C28.8588 30.546 28.6656 31.0123 28.6656 31.4985C28.6656 31.9846 28.8588 32.4509 29.2025 32.7947C29.5463 33.1385 30.0126 33.3316 30.4988 33.3316C30.9849 33.3316 31.4512 33.1385 31.795 32.7947C32.1388 32.4509 32.3319 31.9846 32.3319 31.4985C32.3319 31.0123 32.1388 30.546 31.795 30.2023C31.4512 29.8585 30.9849 29.6653 30.4988 29.6653Z"
										      fill="#E5E5E5"/>
									</g>
									<defs>
										<clipPath id="clip0_61_101">
											<rect width="40" height="40" fill="white"/>
										</clipPath>
									</defs>
								</svg>
							</Link>
						</>
						: <></>
					}
					<Link to={'employees'} className={'navigation--link'}>
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
							<path d="M20 27.395C14.0038 27.42 8.99253 31.6062 7.70378 37.215L7.68753 37.3C7.67378 37.36 7.66628 37.4287 7.66628 37.5C7.66628 38.0175 8.08628 38.4375 8.60378 38.4375C9.05003 38.4375 9.42378 38.125 9.51753 37.7063L9.51878 37.7C10.6125 32.8438 14.89 29.27 20.0013 29.27C25.1125 29.27 29.39 32.8438 30.47 37.6287L30.4838 37.7C30.5788 38.125 30.9513 38.4375 31.3988 38.4375H31.4C31.4713 38.4375 31.54 38.4288 31.6063 38.4137L31.6 38.415C32.025 38.32 32.3375 37.9463 32.3375 37.4987C32.3375 37.4275 32.33 37.3587 32.315 37.2925L32.3163 37.2988C31.01 31.6063 25.9975 27.42 20.005 27.3938H20.0025L20 27.395ZM11.455 13.2525C14.6825 13.2525 17.3 10.6363 17.3 7.4075C17.3 4.17875 14.6838 1.5625 11.455 1.5625C8.22753 1.5625 5.61003 4.17875 5.61003 7.4075C5.61378 10.6337 8.23003 13.2488 11.455 13.2525ZM11.455 3.4375C13.6475 3.4375 15.425 5.215 15.425 7.4075C15.425 9.6 13.6475 11.3775 11.455 11.3775C9.26253 11.3775 7.48503 9.6 7.48503 7.4075C7.48753 5.21625 9.26503 3.44 11.455 3.4375ZM28.6575 13.2525C31.885 13.2525 34.5025 10.6363 34.5025 7.4075C34.5025 4.17875 31.8863 1.5625 28.6575 1.5625C25.43 1.5625 22.8125 4.17875 22.8125 7.4075C22.8163 10.6337 25.4313 13.2488 28.6563 13.2525H28.6575ZM28.6575 3.4375C30.85 3.4375 32.6275 5.215 32.6275 7.4075C32.6275 9.6 30.85 11.3775 28.6575 11.3775C26.465 11.3775 24.6875 9.6 24.6875 7.4075C24.69 5.21625 26.4663 3.44 28.6575 3.4375ZM38.5275 24.8C37.43 19.9325 33.1425 16.3513 28.02 16.3513C27.4913 16.3513 26.9713 16.39 26.4625 16.4625L26.52 16.455C26.4588 16.47 26.405 16.49 26.3538 16.5138L26.3588 16.5112C25.42 13.85 22.9275 11.9775 19.9975 11.9775C17.08 11.9775 14.5963 13.8337 13.6625 16.4287L13.6475 16.4762C13.6263 16.4712 13.61 16.4587 13.5888 16.455C13.14 16.3887 12.6225 16.35 12.095 16.35C12.0925 16.35 12.0888 16.35 12.0863 16.35C6.97128 16.3725 2.69753 19.9425 1.59628 24.7262L1.58253 24.7988C1.56878 24.8588 1.56128 24.9275 1.56128 24.9988C1.56128 25.5163 1.98128 25.9363 2.49878 25.9363C2.94503 25.9363 3.31878 25.6237 3.41253 25.205L3.41378 25.1987C4.33503 21.19 7.86378 18.2425 12.085 18.225H12.0875C12.5063 18.225 12.9175 18.255 13.3188 18.3125L13.2725 18.3075C13.2625 18.4562 13.2275 18.5975 13.2275 18.75C13.235 22.4837 16.2638 25.5075 19.9988 25.5075C23.7338 25.5075 26.7625 22.4837 26.7688 18.75V18.7487C26.7688 18.5987 26.7338 18.4575 26.7238 18.3088C26.7438 18.3062 26.7625 18.315 26.7825 18.31C27.15 18.255 27.575 18.225 28.0075 18.225C28.0125 18.225 28.0163 18.225 28.0213 18.225C32.245 18.2412 35.7738 21.1887 36.6825 25.1388L36.6938 25.1987C36.7888 25.6238 37.1625 25.935 37.6088 25.9363C37.68 25.9363 37.7488 25.9275 37.815 25.9125L37.8088 25.9138C38.2338 25.8188 38.5463 25.445 38.5463 24.9975C38.5463 24.9262 38.5388 24.8575 38.5238 24.7913L38.525 24.7975L38.5275 24.8ZM20 23.645C20 23.645 20 23.645 19.9988 23.645C17.295 23.645 15.1025 21.4537 15.1025 18.7487C15.1025 16.0437 17.295 13.8525 19.9988 13.8525C22.7025 13.8525 24.895 16.045 24.895 18.7487C24.895 18.7487 24.895 18.7488 24.895 18.75C24.8913 21.4525 22.7025 23.6413 20 23.645Z"
							      stroke={'#C6C6C6'}
							/>
						</svg>
					</Link>
					<Link to={'reports'} className={'navigation--link'}>
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
							<path d="M7.5 16.25C7.5 14.8693 8.61929 13.75 10 13.75C11.3807 13.75 12.5 14.8693 12.5 16.25V32.5C12.5 33.8807 11.3807 35 10 35C8.61929 35 7.5 33.8807 7.5 32.5V16.25ZM30 20C28.6193 20 27.5 21.1193 27.5 22.5V32.5C27.5 33.8807 28.6193 35 30 35C31.3807 35 32.5 33.8807 32.5 32.5V22.5C32.5 21.1193 31.3807 20 30 20ZM17.5 32.5C17.5 33.8807 18.6193 35 20 35C21.3807 35 22.5 33.8807 22.5 32.5V7.5C22.5 6.11929 21.3807 5 20 5C18.6193 5 17.5 6.11929 17.5 7.5V32.5Z"/>
						</svg>
					</Link>
				</div>
				<Link to={'/'} className={'sidebar--container__exit'} onClick={() => logOut}>
					<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
						<path
							d="M7.5 37.5H22.5C23.1628 37.4992 23.7983 37.2356 24.2669 36.7669C24.7356 36.2983 24.9992 35.6628 25 35V31.25H22.5V35H7.5V5H22.5V8.75H25V5C24.9992 4.33719 24.7356 3.70175 24.2669 3.23307C23.7983 2.7644 23.1628 2.50076 22.5 2.5H7.5C6.83719 2.50076 6.20175 2.7644 5.73307 3.23307C5.2644 3.70175 5.00076 4.33719 5 5V35C5.00076 35.6628 5.2644 36.2983 5.73307 36.7669C6.20175 37.2356 6.83719 37.4992 7.5 37.5Z"/>
						<path
							d="M25.7325 25.7325L30.215 21.25H12.5V18.75H30.215L25.7325 14.2675L27.5 12.5L35 20L27.5 27.5L25.7325 25.7325Z"/>
					</svg>
				</Link>
			</div>
		</motion.nav>
	</>)
}