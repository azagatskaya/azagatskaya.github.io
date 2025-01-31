import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import RangeSlider from 'src/components/range-slider/RangeSlider';
import AmountSorting from 'src/components/amount-sorting/AmountSorting';
import OperationCompact from 'src/components/operation/operation-compact/OperationCompact';
import { Link, useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/store';
import { Operation } from 'src/homeworks/ts1/3_write';
import { moreOperations } from 'src/store/slices/operations';

export enum AmountSortingEnum {
  dateAsc = 'dateAsc',
  dateDesc = 'dateDesc',
  amountAsc = 'amountAsc',
  amountDesc = 'amountDesc',
}

export type RangeType = {
  min: number;
  max: number;
};

export const AMOUNT_MIN = 0;
export const AMOUNT_MAX = 1_000_000;

const defaultAmountRange = { min: AMOUNT_MIN, max: AMOUNT_MAX };

export default function OperationList(): ReactNode {
  const { t } = useTranslation();
  const [range, setRange] = useState<RangeType>(defaultAmountRange);
  const [sorting, setSorting] = useState<AmountSortingEnum>(AmountSortingEnum.dateAsc);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useSelector((state: AppState) => state.auth?.role);
  const operations = useSelector((state: AppState) => state.operations);
  const dispatch = useDispatch();

  const handleAddOperationClick = (): void => {
    navigate(`/operations/create`);
  };

  const handleShowMoreClick = () => {
    dispatch(moreOperations());
  };

  const handleRangeChange = ([min, max]: number[]): void => {
    setRange({ min, max });
  };

  const handleSortingChange = (value: AmountSortingEnum): void => {
    setSorting(value);
  };

  const operationComparator = useCallback(
    (op1: Operation, op2: Operation) => {
      switch (sorting) {
        case AmountSortingEnum.dateAsc:
          return op1.createdAt.localeCompare(op2.createdAt);
        case AmountSortingEnum.dateDesc:
          return op2.createdAt.localeCompare(op1.createdAt);
        case AmountSortingEnum.amountAsc:
          return op1.amount - op2.amount;
        case AmountSortingEnum.amountDesc:
          return op2.amount - op1.amount;
      }
    },
    [sorting]
  );

  const maxSliderValue = useMemo(() => {
    return operations.reduce((acc, op) => {
      return op.amount > acc ? op.amount : acc;
    }, 0);
  }, [operations]);

  useEffect(() => {
    setRange((prevState) => ({
      min: prevState.min,
      max: maxSliderValue,
    }));
  }, [maxSliderValue]);

  const filteredData = useMemo(() => {
    return operations
      .filter((op) => op.amount >= range.min && op.amount <= range.max)
      .sort((op1, op2) => operationComparator(op1, op2));
  }, [operationComparator, operations, range.max, range.min]);

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
        <RangeSlider range={range} onChange={handleRangeChange} maxSliderValue={maxSliderValue} />
        <AmountSorting sorting={sorting} onChange={handleSortingChange} />
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
