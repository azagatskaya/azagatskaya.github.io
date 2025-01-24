import React, { useCallback } from 'react';
import { AppState } from 'src/store';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import NoAccessPage from 'src/pages/noAccess';
import { RoleEnum } from 'src/store/slices/profile';

export default function withAuth<P>(Component: React.ComponentType<P>) {
  const ComponentWithAuth = (props: P) => {
    const role = useSelector((state: AppState) => state.profile?.role);
    const authenticated = useSelector((state: AppState) => !!state.profile);
    const { pathname } = useLocation();

    const getAccess = useCallback(() => {
      if (pathname.match(/\/operations\/\w+/)) return role === RoleEnum.admin;
      if (pathname.includes('/profile')) return authenticated;
      else return true;
    }, [authenticated, pathname, role]);

    console.log('pathname', pathname, '| role', role, '| auth', authenticated);

    return getAccess() ? <Component {...props} /> : <NoAccessPage />;
  };

  return ComponentWithAuth;
}
