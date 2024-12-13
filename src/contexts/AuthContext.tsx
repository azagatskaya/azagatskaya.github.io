import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

export type AuthType = 'login' | 'logout';

type AuthContextType = {
  authMode: AuthType;
  setAuthMode: Dispatch<SetStateAction<AuthType>> | null;
};

const AuthContext = createContext<AuthContextType>({
  authMode: 'login',
  setAuthMode: null,
});

export const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authMode, setAuthMode] = useState<AuthType>('login');

  return <AuthContext.Provider value={{ authMode, setAuthMode }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
