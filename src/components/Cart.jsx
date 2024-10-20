import React, { useContext } from 'react'
import { useCart } from '@/hooks/CartContext'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { MyContext } from '@/hooks/Context'

export default function Cart() {
	const { state, dispatch } = useCart()
	const { cartItems } = state
	const { setCanAccessCheckPage } = useContext(MyContext)

	const incrementQuantity = id => {
		dispatch({ type: 'INCREMENT_QUANTITY', payload: id })
	}

	const decrementQuantity = id => {
		dispatch({ type: 'DECREMENT_QUANTITY', payload: id })
	}

	const removeFromCart = id => {
		dispatch({ type: 'REMOVE_FROM_CART', payload: id })
	}

	const totalPrice = cartItems.reduce(
		(total, item) => total + item.priceValue * item.quantity,
		0
	)

	const navigate = useNavigate()

	return cartItems.length === 0 ? (
		<p>В корзине нет товаров</p>
	) : (
		<div className='flex justify-between flex-col h-full'>
			<ul>
				{cartItems.map(item => (
					<li key={item.id} className='mb-4 border-b pb-2'>
						<div className='flex justify-between items-center py-3 pr-4'>
							<div className='flex gap-x-3'>
								<Link
									to={`/${item.typeCheck === 'tire' ? 'tires' : 'wheels'}/${
										item.id
									}`}
								>
									<img
										src={`https://sibirkoleso.ru${item.picture}`}
										alt={item.name}
										className='w-20 h-20'
									/>
								</Link>
								<div>
									<Link
										to={`/${item.type === 'tire' ? 'tires' : 'wheels'}/${
											item.id
										}`}
									>
										<p className='font-semibold'>{item.brand}</p>
										<p>{item.type}</p>
									</Link>
									<div className='flex items-center gap-2 mt-1'>
										<button
											onClick={() => decrementQuantity(item.id)}
											className='px-3 bg-transparent border-[1px] border-gray-400 pb-[3px] text-lg rounded'
										>
											-
										</button>
										<button
											onClick={() => incrementQuantity(item.id)}
											className='px-3 bg-transparent border-[1px] border-gray-400 pb-[3px] text-lg rounded'
										>
											+
										</button>
										<p className='text-gray-600'>{item.quantity} шт</p>
									</div>
								</div>
							</div>
							<p>{item.priceValue * item.quantity} ₽</p>
							<button
								onClick={() => removeFromCart(item.id)}
								className='text-xl text-gray-900 hover:text-red-700 transition duration-300'
							>
								<RiDeleteBin6Line />
							</button>
						</div>
					</li>
				))}
			</ul>

			<div className='flex items-center justify-between pb-5'>
				<button
					onClick={() => {
						setCanAccessCheckPage(true)
						navigate('/checkout')
					}}
					className='text-white text-sm rounded-md bg-orange-600 px-6 py-3'
				>
					Оформление заказа
				</button>
				<p className='text-sm'>
					Итог: <span className='font-bold text-base'>{totalPrice}</span> ₽
				</p>
			</div>
		</div>
	)
}
