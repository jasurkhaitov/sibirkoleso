import { linkNavBar, menuBar, styles } from '@/util/constant'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
	return (
		<div className='bg-blackBg'>
				<div
					className={`${styles.pageContainer} flex items-center justify-around py-[50px]`}
				>
					<div className='flex flex-col items-center justify-start gap-[30px]'>
						{menuBar.map(item => {
							return (
								<div key={item.id}>
									<Link
										to={item.url}
										className='flex delay-75 duration-150 ease-in-out fill-gray-300 hover:fill-hoverOrange stroke-gray-300 hover:stroke-hoverOrange gap-2 text-gray-300 hover:text-hoverOrange items-center justify-start'
									>
										<span>{item.logo}</span>
										<span className='text-[18px] leading-[30px] font-bold font-roboto'>
											{item.name}
										</span>
									</Link>
								</div>
							)
						})}
					</div>

					<div className='flex items-center gap-[100px]'>
						<ul className='flex flex-col gap-2'>
							{linkNavBar.map(item => {
								return (
									<li key={item.id}>
										<Link
											className='text-[13px] text-gray-200 leading-[20px] font-opensans hover:text-hoverOrange'
											to={item.slug}
										>
											{item.title}
										</Link>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
	)
}