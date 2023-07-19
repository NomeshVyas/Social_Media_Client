import React from 'react';
import { getItem } from '../utils/localStorageManager'
import { Navigate, Outlet } from 'react-router-dom';

const RequiredUser = () => {
    const authToken = getItem('authToken');
    return (
      authToken ? <Outlet/> : <Navigate to="/login" />
    )
}

export default RequiredUser