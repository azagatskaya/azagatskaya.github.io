import React, { ReactNode, useContext, useMemo } from 'react';
import { Button, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import RangeSlider from 'src/components/range-slider/RangeSlider';
import AmountSorting from 'src/components/amount-sorting/AmountSorting';
import OperationCompact from 'src/components/operation/operation-compact/OperationCompact';
import { Link, useLocation, useNavigate } from 'react-router';
import { OperationsContext, OperationsContextType } from 'src/contexts/OperationsContext';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store';

export default function OperationList(): ReactNode {
  const { t } = useTranslation();
  const { filteredData, handleShowMoreClick } = useContext<OperationsContextType>(OperationsContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useSelector((state: AppState) => state.profile?.role);

  const handleAddOperationClick = (): void => {
    navigate(`/operations/create`);
  };

  const items = useMemo(() => {
    return filteredData.map((op) =>
      isAdmin ? (
        <Link key={op.id.toString()} to={`/operations/${op.id}`} state={{ previousLocation: location }}>
          <OperationCompact
            key={op.id}
            amount={op.amount}
            categoryName={op.category.name ?? ''}
            name={op.name}
            desc={op.desc}
          />
        </Link>
      ) : (
        <OperationCompact
          key={op.id}
          amount={op.amount}
          categoryName={op.category.name ?? ''}
          name={op.name}
          desc={op.desc}
        />
      )
    );
  }, [filteredData, location]);

  return (
    <Flex gap={16} wrap style={{ width: 616 }}>
      <Flex gap={16} style={{ width: '100%', height: 48 }} dir={'row'} justify={'space-between'} align={'center'}>
        <RangeSlider />
        <AmountSorting />
      </Flex>
      <Button variant={'solid'} color={'primary'} onClick={handleAddOperationClick} style={{ width: '100%' }}>
        {t('operations.addButton')}
      </Button>
      {items}
      <Button variant={'solid'} color={'primary'} onClick={handleShowMoreClick} style={{ width: '100%' }}>
        {t('showMoreButton')}
      </Button>
    </Flex>
  );
}
