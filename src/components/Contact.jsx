import { styles } from '@/util/constant'
import { contactData } from '@/util/data'
import React from 'react'

export default function Contact() {
	return (
		<div className={`${styles.pageContainer}`}>
			<hr className='border mb-5 w-[16%] md:w-[6%] border-tt border-black md:mb-12' />

			<div className='grid grid-cols-2 border-b border-gray-400 pb-5'>
				<h2 className='text-lg  md:text-3xl mb-5 font-bold md:mb-6 text-gray-800 text-start'>
					Контакты
				</h2>

				<div className='mb-6 flex flex-col'>
					<p className='text-md text-gray-600 '>Единая справочная:</p>
					<a
						href='tel:+88007751050'
						className='text-[18px] leading-[25px] font-bold text-textBlack hover:text-hoverOrange'
					>
						8 800 775-10-50
					</a>
					<a
						href='mailto: info@sibirkoleso.ru'
						className='text-[18px] leading-[25px] font-bold text-textBlack hover:text-hoverOrange'
					>
						info@sibirkoleso.ru
					</a>
					<p className='text-sm text-gray-800 mt-5'>{contactData.addressOne}</p>
					<p className='text-sm text-gray-800'>{contactData.addressTwo}</p>
				</div>
			</div>

			<section class='text-gray-600 body-font overflow-hidden'>
				<div class='container px-5 py-10 mx-auto'>
					<div class='flex flex-wrap -m-12'>
						{contactData.managersData.map(item => {
							return (
								<div class='p-12 md:w-1/2 flex flex-col items-start' key={item.id}>
									<span class='inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest mb-4'>
										Реквизиты
									</span>

									<p className='text-[14px] font-opensans font-medium'>Индивидуальный предприниматель: <span className='text-[13px] font-light'>{item.entrepreneur}</span></p>

									<p className='text-[14px] font-opensans font-medium'>Почтовый адрес: <span className='text-[13px] font-light'>{item.postalLocation}</span></p>

									<p className='text-[14px] font-opensans font-medium'>Фактический адрес:  <span className='text-[13px] font-light'>{item.address}</span></p>

									<p className='text-[14px] font-opensans font-medium'>ИНН: <span className='text-[13px] font-light'>{item.inn}</span></p>

									<p className='text-[14px] font-opensans font-medium'>ОГРНИП: <span className='text-[13px] font-light'>{item.ogrinip}</span></p>

									<p className='text-[14px] font-opensans font-medium'>Расчетный счет: <span className='text-[13px] font-light'>{item.settlement}</span></p>

									<p className='text-[14px] font-opensans font-medium'>{item.bank}</p>

									<p className='text-[14px] font-opensans font-medium'>БИК: <span className='text-[13px] font-light'>{item.bik}</span></p>

									<p className ='text-[14px] font-opensans font-medium'>Кор. счет: <span className='text-[13px] font-light'>{item.correspondAcc}</span></p>

								</div>
							)
						})}
					</div>
				</div>
			</section>
		</div>
	)
}
