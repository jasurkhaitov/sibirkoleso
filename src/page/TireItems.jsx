import React, { useContext, useState, useEffect } from 'react'
import { tires } from '@/util/data'
import { useParams, Link } from 'react-router-dom'
import { icons, styles } from '@/util/constant'
import { useCart } from '@/hooks/CartContext'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Badge from '@mui/material/Badge'
import { ShoppingCartIcon } from 'lucide-react'
import Cart from '@/components/Cart'
import { MyContext } from '@/hooks/Context'

export default function TireItems() {
	const { id } = useParams()
	const { dispatch, state } = useCart()
	const tireItem = tires.find(tire => tire.id == id)
	const { numberOfStore } = useContext(MyContext)
	const { cartItems } = state

	const [added, setAdded] = useState(false)

	useEffect(() => {
		const isItemInCart = cartItems.some(
			item => item.id == id && item.typeCheck === 'tire'
		)
		setAdded(isItemInCart)
	}, [cartItems, id])

	const addToCart = () => {
		if (!added) {
			dispatch({
				type: 'ADD_TO_CART',
				payload: { ...tireItem, typeCheck: 'tire' },
			})
			setAdded(true)
		}
	}

	return (
		<div
			className={`${styles.pageContainer} h-screen flex items-center justify-center`}
		>
			<Link className='fixed top-5 right-10' to={'/tires'}>
				{icons.closePage}
			</Link>

			<div className='flex items-center justify-center gap-[75px] w-full'>
				<img
					src={'https://sibirkoleso.ru' + tireItem.picture}
					alt={tireItem.name}
					className='w-auto h-[300px] object-cover'
				/>

				<div className='flex flex-col justify-between'>
					<h2 className='text-3xl font-bold text-gray-900'>{tireItem.brand}</h2>
					<h2 className='text-2xl my-2 font-bold text-gray-900'>
						{tireItem.name}
					</h2>
					<p className='text-2xl mb-5 font-medium'>{tireItem.type}</p>
					<p className='text-[15px] leading-[20px] font-opensans'>{`Ширина: ${tireItem.width}`}</p>
					<p className='text-[15px] leading-[20px] font-opensans'>{`Высота: ${tireItem.height}`}</p>
					<p className='text-[15px] leading-[20px] font-opensans mb-5'>{`Диаметр: ${tireItem.diametr}`}</p>
					<p className='text-3xl font-bold flex flex-col text-black mb-5'>
						<span className='text-black text-xs font-light'>
							Цена (при заказе на сайте):
						</span>
						{tireItem.price} Rubl
					</p>

					<div className='flex items-center gap-5'>
						<button
							onClick={addToCart}
							className={`${
								!added
									? 'bg-[#FF5601] hover:bg-[#e04f00] cursor-pointer'
									: 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed'
							} px-5 w-[200px] py-3 text-sm text-white rounded transition duration-300`}
							disabled={added}
						>
							{!added ? 'Добавить в корзину' : 'Уже в корзине'}
						</button>

						<Sheet className='bg-opacityBackground'>
							<SheetTrigger className='focus:outline-none'>
								<div className='bg-white px-3 py-2 rounded-sm border border-gray-500 hover:border-hoverOrange'>
									<Badge badgeContent={numberOfStore} color='primary'>
										<ShoppingCartIcon />
									</Badge>
								</div>
							</SheetTrigger>

							<SheetContent side={'right'} className='w-[500px]'>
								<Cart />
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</div>
	)
}