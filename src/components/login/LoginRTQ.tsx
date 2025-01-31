import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/store';
import { clearAuth } from 'src/store/slices/auth';
import { removeTokenFromLocalStorage } from 'src/shared/token';

export type AuthModeType = 'signin' | 'signout';

export default function LoginRTQ() {
  const authenticated = useSelector((state: AppState) => !!state.auth?.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState<AuthModeType>(authenticated ? 'signout' : 'signin');

  useEffect(() => {
    setAuthMode(authenticated ? 'signout' : 'signin');
  }, [authenticated]);

  const handleToggleAuthMode = () => {
    navigate('/authrtq');
    if (authMode !== 'signout') navigate('/authrtq');
    else {
      removeTokenFromLocalStorage();
      dispatch(clearAuth());
    }
    setAuthMode((prevState) => (prevState === 'signin' ? 'signout' : 'signin'));
  };

  return (
    <Button variant={'filled'} onClick={handleToggleAuthMode} color="primary">
      {`RTQ ${authMode === 'signin' ? 'sign in' : 'sign out'}`}
    </Button>
  );
}
