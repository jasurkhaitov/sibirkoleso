import React, { useState, useEffect } from 'react'
import { styles } from '@/util/constant'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Link } from 'react-router-dom'

export default function Products({ displayedProducts, type }) {
	const [sortOption, setSortOption] = useState('')
	const [sortedProducts, setSortedProducts] = useState(displayedProducts)
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 20

	const sortProducts = (products, option) => {
		let sorted = [...products]

		if (option === 'high-to-low') {
			sorted.sort((a, b) => b.priceValue - a.priceValue)
		} else if (option === 'low-to-high') {
			sorted.sort((a, b) => a.priceValue - b.priceValue)
		}

		return sorted
	}

	useEffect(() => {
		const sorted = sortProducts(displayedProducts, sortOption)
		setSortedProducts(sorted)
	}, [displayedProducts, sortOption])

	const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
	const indexOfLastProduct = currentPage * itemsPerPage
	const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
	const currentProducts = sortedProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	)

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage)
		}
	}

	return (
		<div className={`mt-4 p-4 rounded-md ${styles.productContainer}`}>
			<div className='flex gap-[50px] items-center'>
				<p className='text-[15px] font-medium leading-[20px] font-opensans text-grayColor'>
					Сортировать по:
				</p>

				<Select onValueChange={value => setSortOption(value)}>
					<SelectTrigger className='w-auto'>
						<SelectValue placeholder='Цене' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='high-to-low'>дороже</SelectItem>
						<SelectItem value='low-to-high'>дешевле</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full mt-4'>
				{currentProducts.map(product => (
					<Link to = {`/${type === 'tire' ? 'tires' : 'wheels'}/${product.id}`}
						key={product.id}
						className='relative border hover:border-orange-600 transition duration-500 bg-white cursor-pointer flex flex-col items-center p-2 card' 
					>
						<img
							src={'https://sibirkoleso.ru' + product.picture}
							className='h-52 mb-4 w-auto object-cover itemImg scale-75 delay-150 duration-100'
							alt={product.name}
						/>
						<h4 className='font-bold text-lg mb-1'>{product.brand}</h4>
						<p className='text-grayColor text-[15px] leading-[20px]'>{product.name}</p>
						<p className='text-grayColor text-[13px] leading-[20px]'>{product.type}</p>
						<p className='text-gray-800 mt-2 font-bold'>{product.price}</p>
					</Link>
				))}
			</div>

			<Pagination className='flex justify-center mt-10 mb-5'>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
						  className='cursor-pointer'
						/>
					</PaginationItem>
					
					{[...Array(totalPages)].map((_, i) => (
						<PaginationItem key={i}>
						<PaginationLink
							href="#"
							onClick={() => handlePageChange(i + 1)}
							isActive={currentPage === i + 1}
						>
							{i + 1}
						</PaginationLink>
					</PaginationItem>
					))}

					{totalPages > 5 && currentPage < totalPages - 1 && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					<PaginationItem>
						<PaginationNext
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className='cursor-pointer'
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
