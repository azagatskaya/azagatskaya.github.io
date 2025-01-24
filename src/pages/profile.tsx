import Layout from 'src/components/layout/Layout';
import React from 'react';
import Profile from 'src/components/profile/Profile';
import withAuth from 'src/shared/hocs/withAuth';

export default withAuth(function ProfilePage() {
  return (
    <Layout>
      <Profile />
    </Layout>
  );
});
