import React from 'react'
import { BsBoxSeamFill } from 'react-icons/bs'
import { TbTruckDelivery } from 'react-icons/tb'
import { FaWarehouse } from 'react-icons/fa'
import { LuPlane } from 'react-icons/lu'
import { styles } from '@/util/constant'
import { deliveryMethods } from '@/util/data'

export default function Delivery() {
	const { tyreBox, incity, warehouse, transport } = deliveryMethods

	return (
		<div className={`${styles.pageContainer}`}>
			<hr className='border w-[16%] md:w-[6%] border-tt border-black mb-8 md:mb-12' />

			<div className='w-full border-b border-gray-500'>
				<h2 className='text-xl md:text-4xl font-bold mb-6'>Доставка</h2>

				<p className='mb-6 md:w-[75%] m-auto text-xs md:text-sm'>
					Мы всегда рады предложить самые удобные способы доставки для наших
					клиентов. Если вы не нашли удобный для вас способ доставки — вы всегда
					можете связаться с нашими менеджерами по телефону:{' '}
					<a
						href='tel:+88007751050'
						className='text-[15px] leading-[25px] font-bold text-textBlack hover:text-hoverOrange'
					>
						{' '}
						8 800 775-10-50{' '}
					</a>{' '}
					{'	'} (звонок бесплатный) и обсудить любые варианты доставки вашего
					заказа.
				</p>
			</div>

			<div className='my-10'>
				<div className='flex pl-12 md:pl-0 gap-2 md:gap-5 items-center mb-2'>
					<BsBoxSeamFill className='text-4xl mr-2' />
					<h2 className='text-sm md:text-xl font-bold mb-3'>{tyreBox.title}</h2>
				</div>

				<div className='mb-2 text-md font-medium md:text-md md:pl-12'>
					<p>Сроки: {tyreBox.deadline}</p>
					<p>Стоимость: {tyreBox.price}</p>
				</div>

				<p className='mb-6 md:w-[75%] m-auto text-xs md:text-sm mt-3'>
					{tyreBox.desc}
				</p>
			</div>

			<div className='my-10'>
				<div className='flex pl-12 md:pl-0 gap-2 md:gap-5 items-center mb-2'>
					<TbTruckDelivery className='text-4xl mr-2' />

					<h2 className='text-sm md:text-xl font-bold mb-3'>{incity.title}</h2>
				</div>

				<div className='mb-2 text-md font-medium md:text-md md:pl-12'>
					<p>Сроки: {incity.deadline}</p>
					<p>{incity.price}</p>
				</div>

				<p className='mb-6 md:w-[75%] m-auto text-xs md:text-sm mt-3'>
					{incity.desc}
				</p>
			</div>

			<div className='my-10'>
				<div className='flex pl-12 md:pl-0 gap-2 md:gap-5 items-center mb-2'>
					<FaWarehouse className='text-4xl mr-2' />

					<h2 className='text-sm md:text-xl font-bold mb-3'>
						{warehouse.title}
					</h2>
				</div>

				<div className='mb-2 text-md font-medium md:text-md md:pl-12'>
					<p>{warehouse.text}</p>
				</div>

				<p className='mb-6 md:w-[75%] m-auto text-xs md:text-sm mt-3'>
					{warehouse.desc}
				</p>
			</div>

			<div className='my-10'>
				<div className='flex pl-12 md:pl-0 gap-2 md:gap-5 items-center mb-2'>
					<LuPlane className='text-4xl mr-2' />

					<h2 className='text-sm md:text-xl font-bold mb-3'>
						{transport.title}
					</h2>
				</div>

				<div className='mb-2 text-md font-medium md:text-md md:pl-12'>
					<p>{transport.text}</p>
				</div>

				<p className='mb-6 md:w-[75%] m-auto text-xs md:text-sm mt-3'>
					{transport.desc}
				</p>
			</div>
		</div>
	)
}
