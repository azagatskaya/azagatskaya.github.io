import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OperationsPage from 'src/pages/operations';
import AuthPage from 'src/pages/auth';
import AuthPageRTQ from 'src/pages/authrtq';
import NoAccessPage from 'src/pages/noAccess';
import ProfilePage from 'src/pages/profile';
import React, { useContext } from 'react';
import Modal from 'src/components/modal/Modal';
import Page404 from 'src/pages/404';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';

export default function AppRoutes() {
  const { contextHolder } = useContext<ThemeContextType>(ThemeContext);

  return (
    <BrowserRouter>
      {contextHolder}
      <Routes>
        <Route path={'/'}>
          <Route index element={<OperationsPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="authrtq" element={<AuthPageRTQ />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="operations">
            <Route index element={<OperationsPage />} />
            <Route path="/operations/:operationId" element={<OperationsPage />} />
          </Route>
          <Route path="/noaccess" element={<NoAccessPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="operations/:operationId" element={<Modal />} />
      </Routes>
    </BrowserRouter>
  );
}
