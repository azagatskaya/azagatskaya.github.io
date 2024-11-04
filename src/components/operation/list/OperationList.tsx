import React, { ReactNode, useState } from 'react';
import { createRandomOperations, Operation } from 'src/homeworks/ts1/3_write';
import { Button, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

interface funcAsChildrenProps {
  children: (operations: Operation[]) => ReactNode;
}

export default function OperationList({ children }: funcAsChildrenProps): ReactNode {
  const { t } = useTranslation();

  const [operations, setOperations] = useState<Operation[]>(createRandomOperations(10));

  const handleShowMoreCLick = () => {
    setOperations((prevState) => [...prevState, ...createRandomOperations(10)]);
  };

  return (
    <Flex gap={16} wrap style={{ width: 616 }}>
      {children(operations)}
      <Button variant={'solid'} color={'primary'} onClick={handleShowMoreCLick} style={{ width: '100%' }}>
        {t('showMoreButton')}
      </Button>
    </Flex>
  );
}
