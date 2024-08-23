import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../../contexts/AuthProvider';

const ProtectedRoute = ({ element }) => {
  const {authState, dispatch} = useContext(AuthContext);
  const [cookies] = useCookies(['token']);
  if (!cookies.token) {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    if (cookies.token && cookies.token !== authState.token) {
      const decodedToken = jwtDecode(cookies.token);
      dispatch({
        type: 'login',
        username: decodedToken.username,
        token: cookies.token
      });
    }
  }, [cookies.token, authState.token, dispatch]);
  return element;
};

export default ProtectedRoute;
