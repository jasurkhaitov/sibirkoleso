import { styles } from '@/util/constant'
import React from 'react'

export default function Settings() {
	return (
		<div className='flex flex-1'>
      <div className={`${styles.sideBarContent}`}>
				<div className='py-5 bg-whiteBoard rounded-md'>
					<h2 className='text-2xl font-bold mb-3 text-black text-center'>Здесь вы можете изменить настройки сайта</h2>
				</div>
			</div>
		</div>
	)
}