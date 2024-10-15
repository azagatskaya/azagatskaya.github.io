import React, { ReactNode, useState } from 'react';
import { createRandomOperations, Operation } from 'src/homeworks/ts1/3_write';
import OperationCompact from 'src/components/operation/operation-compact/OperationCompact';
import { Button, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

export default function OperationList(): ReactNode {
  const { t } = useTranslation();

  const [operations, setOperations] = useState<Operation[]>(createRandomOperations(10));

  const handleShowMoreCLick = () => {
    setOperations((prevState) => [...prevState, ...createRandomOperations(10)]);
  };

  return (
    <Flex gap={16} wrap style={{ width: 616 }}>
      {operations.map((op) => (
        <OperationCompact
          key={op.id}
          amount={op.amount}
          categoryName={op.category.name}
          name={op.name}
          desc={op.desc}
        />
      ))}
      <Button variant={'solid'} color={'primary'} onClick={handleShowMoreCLick} style={{ width: '100%' }}>
        {t('showMoreButton')}
      </Button>
    </Flex>
  );
}
