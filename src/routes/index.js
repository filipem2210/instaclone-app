import React from 'react';
import Loading from '../components/Loading';

import {useAuth} from '../contexts/auth';

import AuthRoutes from './auth';
import AppRoutes from './app';

const Routes = () => {
  const {signed, loading} = useAuth();

  if (loading) {
    return <Loading />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
