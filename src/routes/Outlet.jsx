import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { MyContext } from '../hooks/Context'
const PrivateRoute = () => {
	const { user } = useContext(MyContext)

	if (!user) {
		return <Navigate to='/login' />
	}

	return <Outlet />
}

export default PrivateRoute
