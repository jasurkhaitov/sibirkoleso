import { PaymentData } from '@/util/data'
import React from 'react'
import InformationPage from './InformationPage'
import { styles } from '@/util/constant'

export default function Payment() {
	return (
		<div className={`${styles.pageContainer}`}>
			<hr className='border w-[16%] md:w-[6%] border-tt border-black mb-10' />
			<h1 className='text-3xl md:text-4xl font-bold mb-6 text-start'>Оплата</h1>
			
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{PaymentData.paymentOptions.map((option, index) => (
					<div
						key={index}
						className='bg-white border border-gray-300 rounded text-start p-5 md:p-10'
					>
						<h2 className='text-sm md:text-xl font-semibold mb-2'>{option.title}</h2>
						<p className='text-xs md:text-sm'>{option.text}</p>
					</div>
				))}
			</div>

			<InformationPage/>
		</div>
	)
}
