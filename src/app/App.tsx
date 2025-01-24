import React, { useCallback, useEffect } from 'react';
import './App.css';
import AppRoutes from 'src/routes/routes';
import { useDispatch } from 'react-redux';
import { initialize } from 'src/store/slices/init';
import { clearProfile, RoleEnum, setProfile } from 'src/store/slices/profile';
import users from 'src/shared/mock/users';

function App() {
  const dispatch = useDispatch();

  const checkAuth = useCallback(() => {
    const t = localStorage.getItem('token');
    if (t) {
      const uid = t.split('_')[1];
      const profile = users.find((u) => u.email === uid);
      if (!profile) {
        localStorage.removeItem('token');
        dispatch(clearProfile());
      } else {
        dispatch(
          setProfile({
            email: profile.email,
            password: profile.password,
            nickname: profile.nickname,
            about: profile.about,
            role: RoleEnum[profile.role],
          })
        );
      }
    } else dispatch(clearProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initialize());
    checkAuth();
  }, [checkAuth, dispatch]);

  return <AppRoutes />;
}

export default App;
