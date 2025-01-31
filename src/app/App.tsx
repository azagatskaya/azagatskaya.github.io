import React, { useCallback, useEffect } from 'react';
import './App.css';
import AppRoutes from 'src/routes/routes';
import { useDispatch } from 'react-redux';
import { initialize } from 'src/store/slices/init';
import { AppDispatch } from 'src/store';
import { clearAuth, getProfile } from 'src/store/slices/auth';
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from 'src/shared/token';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const checkAuth = useCallback(async () => {
    const t = getTokenFromLocalStorage();
    if (t) {
      try {
        await dispatch(getProfile(t));
      } catch (err) {
        dispatch(clearAuth());
        removeTokenFromLocalStorage();
      }
    } else dispatch(clearAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initialize());
    checkAuth();
  }, [checkAuth, dispatch]);

  return <AppRoutes />;
}

export default App;
