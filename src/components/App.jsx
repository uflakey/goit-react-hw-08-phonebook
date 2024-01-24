import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader/Loader';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import { currentUsersThunk } from 'slice/auth/thunk';
import { lazy, useEffect } from 'react';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';

const Home = lazy(() => import('pages/Home'));
const SingUp = lazy(() => import('pages/SingUp'));
const LogIn = lazy(() => import('pages/Login'));
const Contacts = lazy(() => import('pages/Contacts'));

const App = () => {
  const { isLoading } = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentUsersThunk());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="contacts"
            element={
              <PrivateRoute component={<Contacts />} redirectTo="/login" />
            }
          />
          <Route
            path="registration"
            element={
              <PublicRoute component={<SingUp />} redirectTo="/contacts" />
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute component={<LogIn />} redirectTo="/contacts" />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;