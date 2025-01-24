import Layout from 'src/components/layout/Layout';
import React from 'react';
import OperationList from 'src/components/operation/list/OperationList';
import withAuth from 'src/shared/hocs/withAuth';

export default withAuth(function OperationsPage() {
  return (
    <Layout>
      <OperationList />
    </Layout>
  );
});
