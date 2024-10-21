import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useCart } from './hooks/CartContext'
import { MyContext } from './hooks/Context'
import PrivateRoute from './routes/Outlet'

import Home from './page/Home'
import Error from './page/Error'
import Login from './page/Login'
import Admin from './page/Admin'
import WheelItems from './page/WheelItems'
import TireItems from './page/TireItems'
import TiresPage from './page/TiresPage'
import WheelsPage from './page/WheelsPage'
import AboutPage from './page/AboutPage'
import ContactPage from './page/ContactPage'
import PaymentPage from './page/PaymentPage'
import DeliveryPage from './page/DeliveryPage'
import Checkout from './page/Checkout'
import AdminWheelsPage from './page/AdminWheelsPage'
import AdminTirePage from './page/AdminTirePage'
import SettingsPage from './page/SettingsPage'

export default function App() {
  const { state } = useCart(); 
  const { cartItems } = state;

	const [user, setUser] = useState(false)
	const [numberOfStore, setNumberOfStores] = useState(0)
	const [tireParam, setTireParam] = useState({ width: [], height: [], diametr: [], brand: [] })
	const [wheelParam, setWheelParam] = useState({ width: [], height: [], diametr: [], brand: [] })
	const [selectedTire, setSelectedTire] = useState(0)
	const [selectedWheel, setSelectedWheel] = useState(0)
	const [canAccessCheckPage, setCanAccessCheckPage] = useState(false);

	useEffect(() => {
    setNumberOfStores(cartItems.length);
  }, [cartItems]);

	return (
		<div className='light'>
			<MyContext.Provider
				value={{selectedTire, setSelectedTire, selectedWheel, setSelectedWheel, user, setUser, numberOfStore, setNumberOfStores, tireParam, setTireParam, wheelParam, setWheelParam, canAccessCheckPage, setCanAccessCheckPage }}
			>
				<Routes>
					<Route path='/' element={<Home />} />

					<Route path='/login' element={<Login />} />
					<Route path='/about' element={<AboutPage/>}/>
					<Route path='/contact' element={<ContactPage/>}/>
					<Route path='/payment' element={<PaymentPage/>}/>
					<Route path='/delivery' element={<DeliveryPage/>}/>
					<Route path='/checkout' element={canAccessCheckPage ? <Checkout /> : <Navigate to="/" />}/>

					<Route path='/tires' element={<TiresPage />} />
					<Route path='/tires/:id' element={<TireItems />} />
					<Route path='/wheels' element={<WheelsPage />} />
					<Route path='/wheels/:id' element={<WheelItems />} />

					<Route path='admin' element={<PrivateRoute />}>
						<Route path='/admin' element={<Admin />} />
						<Route path='/admin/wheels' element={<AdminWheelsPage />} />
						<Route path='/admin/tires' element={<AdminTirePage />} />
						<Route path='/admin/settings' element={<SettingsPage />} />
					</Route>

					<Route path='*' element={<Error />} />
				</Routes>
			</MyContext.Provider>
		</div>
	)
}