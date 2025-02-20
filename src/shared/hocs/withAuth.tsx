import React, { useCallback } from 'react';
import { AppState } from 'src/store';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import NoAccessPage from 'src/pages/noAccess';
import { RoleEnum } from 'src/store/slices/auth';

export default function withAuth<P>(Component: React.ComponentType<P>) {
  const ComponentWithAuth = (props: P) => {
    const role = useSelector((state: AppState) => state.auth?.role);
    const authenticated = useSelector((state: AppState) => !!state.auth?.email);
    const { pathname } = useLocation();

    const getAccess = useCallback(() => {
      if (pathname.match(/\/operations\/\w+/)) return role === RoleEnum.admin;
      if (pathname.includes('/profile')) return authenticated;
      else return true;
    }, [authenticated, pathname, role]);

    return getAccess() ? <Component {...props} /> : <NoAccessPage />;
  };

  return ComponentWithAuth;
}
