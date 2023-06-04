import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';

function AuthRoot() {
  const isAuth = useSelector((state) => state.user.isAuth);
  return isAuth ? <Outlet /> : <Navigate to={'/login'} />;
}

AuthRoot.propTypes = {};
export default AuthRoot;
