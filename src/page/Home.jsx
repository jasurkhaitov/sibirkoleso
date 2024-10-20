import Advantages from '@/components/Advantages'
import Filter from '@/components/Filter'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function Home() {
	return (
		<div>
			<Navbar/>

			<Filter/>

			<Advantages/>

			<Footer/>
		</div>
	)
}