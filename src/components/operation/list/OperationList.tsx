import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { createRandomOperations, Operation } from 'src/homeworks/ts1/3_write';
import { Button, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import RangeSlider from 'src/components/range-slider/RangeSlider';
import AmountSorting from 'src/components/amount-sorting/AmountSorting';

interface funcAsChildrenProps {
  children: (operations: Operation[]) => ReactNode;
}

export enum AmountSortingEnum {
  dateAsc = 'dateAsc',
  dateDesc = 'dateDesc',
  amountAsc = 'amountAsc',
  amountDesc = 'amountDesc',
}

export type AmountSortingType = Record<AmountSortingEnum, string>;

export type RangeType = {
  min: number;
  max: number;
};

export const AMOUNT_MIN = 0;
export const AMOUNT_MAX = 10_000;

const defaultAmountRange = { min: AMOUNT_MIN, max: AMOUNT_MAX };

export default function OperationList({ children }: funcAsChildrenProps): ReactNode {
  const { t } = useTranslation();
  const [range, setRange] = useState<RangeType>(defaultAmountRange);
  const [operations, setOperations] = useState<Operation[]>(createRandomOperations(10));
  const [sorting, setSorting] = useState<AmountSortingEnum>(AmountSortingEnum.dateAsc);
  const handleShowMoreCLick = () => {
    setOperations((prevState) => [...prevState, ...createRandomOperations(10)]);
  };

  const handleRangeChange = ([min, max]: number[]): void => {
    setRange({ min, max });
  };

  const handleChangeSorting = (value: AmountSortingEnum): void => {
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

  const filteredData = useMemo(() => {
    return operations
      .filter((op) => op.amount >= range.min && op.amount <= range.max)
      .sort((op1, op2) => operationComparator(op1, op2));
  }, [operationComparator, operations, range.max, range.min]);

  return (
    <Flex gap={16} wrap style={{ width: 616 }}>
      <Flex gap={16} style={{ width: '100%', height: 48 }} dir={'row'} justify={'space-between'} align={'center'}>
        <RangeSlider range={range} onChange={handleRangeChange} />
        <AmountSorting value={sorting} onChange={handleChangeSorting} />
      </Flex>
      {children(filteredData)}
      <Button variant={'solid'} color={'primary'} onClick={handleShowMoreCLick} style={{ width: '100%' }}>
        {t('showMoreButton')}
      </Button>
    </Flex>
  );
}
