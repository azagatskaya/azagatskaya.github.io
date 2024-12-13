import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OperationsPage from 'src/pages/operations';
import AuthPage from 'src/pages/auth';
import ProfilePage from 'src/pages/profile';
import React from 'react';
import Modal from 'src/components/modal/Modal';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<OperationsPage />}>
          <Route index element={<OperationsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/operations/:operationId" element={<OperationsPage />} />
          <Route path="*" element={<ProfilePage />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/operations/:operationId" element={<Modal />} />
      </Routes>
    </BrowserRouter>
  );
}
