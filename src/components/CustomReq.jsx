import { icons, styles } from '@/util/constant'
import { CustomerRequests } from '@/util/data'
import React from 'react'
import NotFound from '../assets/img/notFound.webp'

export default function CustomReq() {
	return (
		<div className='flex flex-1'>
			{CustomerRequests.length > 0 ? (
				<div className={`${styles.sideBarContent}`}>
					<div className='px-5 w-full flex items-center justify-between py-3 bg-whiteBoard rounded-md'>
						<h2 className='text-2xl font-bold mb-3 text-black'>Запросы пользователей</h2>

						<button className='text-[15px] px-5 text-white rounded-md py-2 bg-hoverOrange active:scale-90'>
							Удалить
						</button>
					</div>

					<section className='text-gray-600 body-font'>
						<div className='container mx-auto'>
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
								{CustomerRequests.map(item => {
									return (
										<div
											key={item.id}
											className='flex p-3 border border-gray-300 rounded-lg shadow-md flex-col items-start text-start bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ease-in-out'
										>
											<h2 className='text-2xl font-semibold mb-2 text-gray-800'>
												{item.name} {item.surName}
											</h2>

											<p className='w-full leading-relaxed text-gray-600 mb-2 flex items-center gap-2'>
												<strong>{icons.email}</strong> {item.email}
											</p>

											<p className='w-full leading-relaxed text-gray-600 mb-2 flex items-center gap-2'>
												<strong>{icons.call}</strong> {item.phone}
											</p>

											{item.telegramNumber && (
												<p className='w-full leading-relaxed text-gray-600 mb-2 flex items-center gap-2'>
													<strong>{icons.telegram}</strong>{' '}
													{item.telegramNumber}
												</p>
											)}

											{item.whatsapp && (
												<p className='w-full leading-relaxed text-gray-600 mb-1 flex items-center gap-2'>
													<strong>{icons.whatsapp}</strong> {item.whatsapp}
												</p>
											)}

											<p className='w-full text-[14px] font-mono leading-relaxed text-blue-600 mt-5 flex items-center gap-2'>
												{item.date}
											</p>
										</div>
									)
								})}
							</div>
						</div>
					</section>
				</div>
			) : (
				<div className={`${styles.sideBarContent}`}>
					<img className='w-[500px] h-auto object-contain' src={NotFound} alt="Client Reqiests Not" />
					<p className='text-3xl capitalize leading-relaxed font-bold font-mono text-blue-600'>запросы клиента не найдены</p>
				</div>
			)}
		</div>
	)
}