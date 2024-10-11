import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import { fetchDataFromJson } from './api/dataSlice'
import { MyContext } from './hooks/Context'

export default function App() {
	const dispatch = useDispatch()
	const item = useSelector(state => state.data)

	const [db, setDb] = useState(item.data)

	useEffect(() => {
		dispatch(fetchDataFromJson())
	}, [dispatch])

	useEffect(() => {
		setDb(item.data)
	}, [item.data])

	return (
		<div className='light'>
			<MyContext.Provider value={{db}}>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</MyContext.Provider>
		</div>
	)
}
