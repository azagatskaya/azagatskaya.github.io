import { createContext, Dispatch, SetStateAction } from 'react';

export type AuthType = 'login' | 'logout';

type AuthContextType = {
  authMode: AuthType;
  setAuthMode: Dispatch<SetStateAction<AuthType>> | null;
};

const AuthContext = createContext<AuthContextType>({
  authMode: 'login',
  setAuthMode: null,
});
AuthContext.displayName = 'AuthContext';

export default AuthContext;
