import Navbar from '@/components/Navbar'
import { MyContext } from '@/hooks/Context'
import { adminPassword } from '@/util/password'
import React, { useContext, useState } from 'react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function Login() {
	const [showPassword, setShowPassword] = useState(false)
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState(null)
	const [passwordError, setPasswordError] = useState(null)
	const [generalError, setGeneralError] = useState(null)

	const { setUser } = useContext(MyContext)
	const navigate = useNavigate()

	const togglePasswordVisibility = () => {
		setShowPassword(prevState => !prevState)
	}

	const isFormValid = login.length >= 5 && password.length >= 6

	const handleLoginChange = (e) => {
		const value = e.target.value
		setLogin(value)

		if (value.length < 5) {
			setLoginError('Логин должен содержать не менее 5 символов')
		} else {
			setLoginError(null)
		}
	}

	const handlePasswordChange = (e) => {
		const value = e.target.value
		setPassword(value)

		if (value.length < 6) {
			setPasswordError('Пароль должен содержать не менее 6 символов')
		} else {
			setPasswordError(null)
		}
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (login.length >= 5 && password.length >= 6) {
			if (login === adminPassword.login && password === adminPassword.password) {
				setUser(true)
				navigate('/admin')
			} else {
				setGeneralError('Неправильный логин или пароль')
			}
		}
	}

	return (
		<div>
			<div className='fixed top-0 left-0 w-full'>
				<Navbar />
			</div>

			<div className={`flex justify-center items-center min-h-screen bg-gray-100`}>
				<div className='bg-white p-5 sm:p-8 rounded-lg shadow-xl w-[90%] max-w-md'>
					<p className='text-[20px] text-center font-semibold tracking-wide mb-3 leading-[20px] text-green-700 font-mono border-l-[5px] border-green-600 bg-green-300 p-3 rounded'>
						*Только администратор может войти на эту страницу
					</p>

					{generalError && (
						<p className='text-red-500 text-center font-semibold mb-4'>
							{generalError}
						</p>
					)}

					<form onSubmit={handleSubmit} autoComplete='off'>
						<div className='mb-4'>
							<label className='block mb-1 text-gray-600' htmlFor='login'>
								Логин
							</label>
							<div className={`relative flex items-center rounded-lg py-2 px-3 transition-all duration-300 border border-gray-300 focus-within:border-blue-500`}>
								<FaEnvelope className='mr-2 text-gray-500' />
								<input
									className='w-full px-2 py-1 text-gray-700 bg-transparent focus:outline-none'
									type='text'
									id='login'
									placeholder='Введите логин'
									value={login}
									onChange={handleLoginChange}
									required
									autoComplete='off'
								/>
							</div>
							{loginError && <p className='text-red-500 text-sm'>{loginError}</p>}
						</div>

						<div className='mb-7'>
							<label className='block mb-1 text-gray-600' htmlFor='password'>
								Пароль
							</label>
							<div className={`relative flex items-center rounded-lg py-2 px-3 transition-all duration-300 border border-gray-300 focus-within:border-blue-500`}>
								<FaLock className='mr-2 text-gray-500' />
								<input
									className='w-full px-2 py-1 text-gray-700 bg-transparent focus:outline-none'
									type={showPassword ? 'text' : 'password'}
									id='password'
									placeholder='Введите пароль'
									value={password}
									onChange={handlePasswordChange}
									required
									autoComplete='off'
								/>
								<button
									type='button'
									className='absolute right-3 text-gray-500 focus:outline-none'
									onClick={togglePasswordVisibility}
								>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>
							{passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}
						</div>

						<button
							type='submit'
							className={`w-full text-white py-3 rounded-lg transition duration-300 ${isFormValid ? 'bg-blue-600 active:scale-90 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'}`}
							disabled={!isFormValid}
						>
							Отправить
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}