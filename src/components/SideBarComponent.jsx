import React, { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from '../components/ui/sidebar'
import { SlBasket } from 'react-icons/sl'
import { PiTireBold } from 'react-icons/pi'
import { IconSettings } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { GiCarWheel } from 'react-icons/gi'
import { settings } from '@/util/data'
import { icons } from '@/util/constant'

export default function SideBarComponent() {
	const links = [
		{
			label: 'Customer Requests',
			href: '/admin',
			icon: (
				<SlBasket className='text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0' />
			),
		},
		{
			label: 'Wheels',
			href: '/admin/wheels',
			icon: (
				<GiCarWheel className='text-neutral-600 dark:text-neutral-200 h-6 w-6 flex-shrink-0' />
			),
		},
		{
			label: 'Tires',
			href: '/admin/tires',
			icon: (
				<PiTireBold className='text-neutral-600 dark:text-neutral-200 h-6 w-6 flex-shrink-0' />
			),
		},
		{
			label: 'Settings',
			href: '/admin/settings',
			icon: (
				<IconSettings className='text-neutral-600 dark:text-neutral-200 h-6 w-6 flex-shrink-0' />
			),
		},
	]

	const [open, setOpen] = useState(false)  

	return (
		<Sidebar open={open} setOpen={setOpen} animate={true}>
			<SidebarBody className='justify-between gap-10'>
				<div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
					<Logo />

					<div className='mt-8 flex flex-col gap-3'>
						{links.map((link, idx) => (
							<SidebarLink key={idx} link={link} />
						))}
					</div>
				</div>

        <LogOut/>
			</SidebarBody>
		</Sidebar>
	)
}

export const Logo = () => {
	return (
		<Link
			to='/'
			className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
		>
			<img src={settings.logoIcon} alt={settings.name} />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='text-[20px] font-roboto leading-[30px] font-bold'
			>
				{settings.name}
			</motion.span>
		</Link>
	)
}

export const LogOut = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

	return (
		<div className='font-normal overflow-x-hidden flex space-x-2 items-center text-sm text-black py-1 relative z-20 cursor-pointer' onClick={handleLogout}>
			<span>{icons.logout}</span>
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='text-[15px] font-roboto leading-[30px] font-medium'
			>
				Выйти
			</motion.span>
		</div>
	)
}
