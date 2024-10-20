import Navbar from '@/components/Navbar'
import { icons } from '@/util/constant'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
	return (
		<div className='w-full h-screen bg-red-500 relative'>
			<div className='fixed top-0 left-0 w-full'>
				<Navbar/>
			</div>
			
			<div className='w-full h-full flex flex-col items-center justify-center bg-bgWhite gap-3'>
				<p className='font-mono text-green-700 text-4xl font-black flex items-center gap-3'>404 <span>{icons.sad}</span> Страница не найдена</p>
				<Link to={'/'} className='bg-transparent rounded-md flex items-center justify-center gap-2 px-3 py-2 border-green-600 border-2'>
					<span>{icons.home}</span>
					<span className='text-xl font-mono text-green-700'>Вернуться на главную</span>
				</Link>
			</div>
		</div>
	)
}