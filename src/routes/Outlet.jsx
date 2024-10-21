import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MyContext } from '../hooks/Context';

const PrivateRoute = () => {
  const { user } = useContext(MyContext);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  if (!user && !isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}

export default PrivateRoute;