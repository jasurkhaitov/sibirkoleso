import { MyContext } from '@/hooks/Context'
import { icons, styles } from '@/util/constant'
import React, { useContext, useState } from 'react'
import Logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

export default function Navbar() {
	const { db } = useContext(MyContext)
	const [openModal, setOpenModal] = useState(false)
	const [hover, setHover] = useState(false)

	const [hoverPhone, setHoverPhone] = useState(false)

	const [hoverLocation, setHoverLocation] = useState(false)

	return (
		<div className='bg-white border-b border-slate-200'>
			<div
				className={`${styles.pageContainer} py-[15px] flex items-center justify-between`}
			>
				<div className='flex items-center justify-center gap-[50px]'>
					<Link to={'/'} className='flex items-center justify-start gap-3'>
						<img className='w-[33px] h-[34px]' src={Logo} alt={db?.name} />
						<span className='text-[20px] font-roboto leading-[30px] font-bold'>
							{db?.name}
						</span>
					</Link>

					<span className='h-[30px] w-[1px] hidden md:block bg-slate-300'></span>

					<button
						className='flex items-center justify-start gap-[5px]'
						onMouseEnter={() => setHoverPhone(true)}
						onMouseLeave={() => setHoverPhone(false)}
						onClick={() => setOpenModal(!openModal)}
					>
						<span
							className={`${
								hoverPhone
									? 'fill-hoverOrange duration-100 delay-75'
									: 'fill-darkColor duration-100 delay-75'
							}`}
						>
							{openModal ? icons.closeBtn : icons.spinnerBars}
						</span>
						<span
							className={`${
								hoverPhone
									? 'text-hoverOrange duration-100 delay-75'
									: 'text-darkColor duration-100 delay-75'
							} text-[13px] leading-4 font-opensans`}
						>
							Меню
						</span>
					</button>
				</div>

				<div className='flex items-center justify-between gap-[250px]'>
					<Link
						className='flex items-center justify-start gap-[5px]'
						to={'/stores'}
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
					>
						<span
							className={`${
								hover
									? 'fill-hoverOrange duration-100 delay-75'
									: 'fill-darkColor duration-100 delay-75'
							}`}
						>
							{icons.phone}
						</span>
						<span
							className={`${
								hover
									? 'text-hoverOrange duration-100 delay-75'
									: 'text-darkColor duration-100 delay-75'
							} text-[15px] leading-4 font-opensans`}
						>
							Магазины
						</span>
					</Link>

					<div className='flex items-center justify-center gap-[50px]'>
						<Link
							to={'/location'}
							className='flex items-center justify-start gap-[5px]'
							onMouseEnter={() => setHoverLocation(true)}
							onMouseLeave={() => setHoverLocation(false)}
						>
							<span
								className={`${
									hoverLocation
										? 'fill-hoverOrange duration-100 delay-75'
										: 'fill-darkColor duration-100 delay-75'
								}`}
							>
								{icons.location}
							</span>
							<span
								className={`${
									hoverLocation
										? 'text-hoverOrange duration-100 delay-75'
										: 'text-darkColor duration-100 delay-75'
								} text-[15px] leading-4 font-opensans`}
							>
								Novosibirsk
							</span>
						</Link>

						<span className='h-[30px] w-[1px] hidden md:block bg-slate-300'></span>

						<div className='flex items-center justify-center gap-[40px]'>
							<div class='indicator'>
								<span className='indicator-item text-[12px] leading-[20px] w-[20px] h-[20px] rounded-full bg-hoverOrange flex items-center justify-center text-white font-semibold'>
									99
								</span>
								<button>{icons.badge}</button>
							</div>

							<Link to={'/auth'} className=''>
								{icons.user}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}