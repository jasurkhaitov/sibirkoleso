import React, { useState } from 'react'
import { styles } from '@/util/constant'
import TireFilterHome from './TireFilterHome'
import WheelFilterHome from './WheelFilterHome'

export default function Filter() {
	const [activeTab, setActiveTab] = useState('account')

	return (
		<>
			<div className='py-5 bg-whiteBoard'>
				<div className={`${styles.pageContainer} flex justify-center `}>
					<button
						className={`text-lg font-semibold px-4 pb-3 ${
							activeTab === 'account'
								? 'border-b-2 border-black text-black'
								: 'text-gray-500'
						}`}
						onClick={() => setActiveTab('account')}
					>
						Шины
					</button>

					<button
						className={`text-lg font-semibold px-4 pb-3 ${
							activeTab === 'password'
								? 'border-b-2 border-black text-black'
								: 'text-gray-500'
						}`}
						onClick={() => setActiveTab('password')}
					>
						Диски
					</button>
				</div>
			</div>

			<div className='w-full'>
				{activeTab === 'account' ? <TireFilterHome /> : <WheelFilterHome />}
			</div>
		</>
	)
}