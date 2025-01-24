import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OperationsPage from 'src/pages/operations';
import AuthPage from 'src/pages/auth';
import NoAccessPage from 'src/pages/noAccess';
import ProfilePage from 'src/pages/profile';
import React from 'react';
import Modal from 'src/components/modal/Modal';
import Page404 from 'src/pages/404';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'}>
          <Route index element={<OperationsPage />} />
          <Route path="auth" element={<AuthPage />} />
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
