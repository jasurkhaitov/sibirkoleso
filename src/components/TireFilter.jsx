import React, { useContext, useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { FaChevronUp } from 'react-icons/fa6'
import { tires } from '@/util/data'
import Select from './Select'
import Products from './Products'
import { icons, styles } from '@/util/constant'
import { MyContext } from '@/hooks/Context'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Cart from './Cart'
import Badge from '@mui/material/Badge'
import { ShoppingCartIcon } from 'lucide-react'

export default function TireFilter() {
	const {
		numberOfStore,
		tireParam,
		setTireParam,
		selectedTire,
		setSelectedTire,
	} = useContext(MyContext)

	const [filteredProducts, setFilteredProducts] = useState([])
	const [displayedProducts, setDisplayedProducts] = useState(tires)
	const [options, setOptions] = useState({
		width: [],
		height: [],
		diametr: [],
		brand: [],
	})
	const [resetTrigger, setResetTrigger] = useState(0)
	const [showScrollButton, setShowScrollButton] = useState(false)

	const updateAvailableOptions = filterParams => {
		let filtered = tires
		const keys = ['width', 'height', 'diametr', 'brand']

		keys.forEach(key => {
			if (filterParams[key].length > 0) {
				filtered = filtered.filter(tire =>
					filterParams[key].includes(tire[key])
				)
			}
		})

		const newOptions = keys.reduce((acc, key) => {
			acc[key] = [...new Set(filtered.map(t => t[key]))].filter(Boolean)
			return acc
		}, {})

		setOptions(newOptions)
		setFilteredProducts(filtered)
		setSelectedTire(filtered.length)
	}

	const handleChange = (selectedValues, name) => {
		const newParams = { ...tireParam, [name]: selectedValues }
		setTireParam(newParams)
		updateAvailableOptions(newParams)
	}

	const handleSearch = () => {
		setDisplayedProducts(
			Object.values(tireParam).some(arr => arr.length > 0)
				? filteredProducts
				: tires
		)
	}

	const handleReset = () => {
		setTireParam({ width: [], height: [], diametr: [], brand: [] })
		setFilteredProducts([])
		setDisplayedProducts(tires)
		setResetTrigger(prev => prev + 1)
		updateAvailableOptions({ width: [], height: [], diametr: [], brand: [] })
	}

	const isSearchDisabled = Object.values(tireParam).every(
		value => value.length === 0
	)

	useEffect(() => {
		const initialOptions = {
			width: [...new Set(tires.map(t => t.width))].filter(Boolean),
			height: [...new Set(tires.map(t => t.height))].filter(Boolean),
			diametr: [...new Set(tires.map(t => t.diametr))].filter(Boolean),
			brand: [...new Set(tires.map(t => t.brand))].filter(Boolean),
		}
		setOptions(initialOptions)
	}, [])

	useEffect(() => {
		const handleScroll = () => setShowScrollButton(window.scrollY > 550)
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<>
			<div className='w-full bg-[#282828] py-6 shadow-md'>
				<div className={styles.pageContainer}>
					<div className='mb-5'>
						<div className='flex items-center justify-start gap-2 mb-7'>
							<span>{icons.setting}</span>
							<span className='text-[15px] leading-[20px] text-white'>
								По параметрам
							</span>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
							{['width', 'height', 'diametr', 'brand'].map(param => (
								<div key={param}>
									<h3 className='py-5 hover:text-orange-500 text-[#666666] bg-white rounded-t-md px-4 text-[13px] duration-300 cursor-pointer'>
										{param === 'width'
											? 'Ширина'
											: param === 'height'
											? 'Высота'
											: param === 'diametr'
											? 'Диаметр'
											: 'Бренд'}
									</h3>
									<Select
										options={options[param]}
										onChange={selectedValues =>
											handleChange(selectedValues, param)
										}
										name={param}
										resetTrigger={resetTrigger}
									/>
								</div>
							))}
						</div>
					</div>

					<div className='w-full flex gap-8 justify-center mb-4'>
						<button
							className={`px-6 bg-[#666666] text-sm text-white py-3 rounded-md hover:bg-gray-600 ${
								isSearchDisabled ? 'opacity-50 cursor-not-allowed' : ''
							}`}
							onClick={handleSearch}
							disabled={isSearchDisabled}
						>
							Поиск{' '}
							{selectedTire > 0 && !isSearchDisabled ? `(${selectedTire})` : ''}
						</button>
						{!isSearchDisabled && (
							<button
								className='px-6 flex items-center gap-2 text-sm text-[#909090] py-2 rounded-md hover:text-orange-500 transition duration-300'
								onClick={handleReset}
							>
								<MdCancel /> Сбросить
							</button>
						)}
					</div>
				</div>
			</div>

			{displayedProducts.length > 0 && (
				<Products displayedProducts={displayedProducts} type={'tire'} />
			)}

			{showScrollButton && (
				<button
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className='fixed bottom-[67vh] right-[90vw] z-0 text-xl bg-white font-[400] p-4 rounded-full shadow-lg border hover:text-orange-600 hover:border-orange-600 transition duration-300'
				>
					<FaChevronUp size={20} className='font-normal' />
				</button>
			)}

			{showScrollButton && (
				<button className='fixed bottom-[67vh] left-[90vw] z-10'>
					<Sheet className='bg-opacityBackground'>
						<SheetTrigger className='focus:outline-none'>
							<div className='bg-white p-3 rounded-full border border-gray-500 hover:border-hoverOrange'>
								<Badge badgeContent={numberOfStore} color='primary'>
									<ShoppingCartIcon />
								</Badge>
							</div>
						</SheetTrigger>

						<SheetContent side={'right'} className='w-[500px]'>
							<Cart />
						</SheetContent>
					</Sheet>
				</button>
			)}
		</>
	)
}
