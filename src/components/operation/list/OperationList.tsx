import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { createRandomOperations, Operation } from 'src/homeworks/ts1/3_write';
import { Button, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import RangeSlider from 'src/components/range-slider/RangeSlider';
import AmountSorting from 'src/components/amount-sorting/AmountSorting';
import OperationCompact from 'src/components/operation/operation-compact/OperationCompact';
import Modal from 'src/components/modal/Modal';
import OperationFull, { OperationProps } from 'src/components/operation/operation-full/OperationFull';
import { getId } from 'src/homeworks/ts1/mock/products';
import dayjs from 'dayjs';

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

const defaultOperation: Operation = {
  id: `pr_${getId(6)}`,
  name: 'Трата',
  createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
  amount: 0,
  category: { id: '', name: '' },
  type: 'Cost',
};

export default function OperationList(): ReactNode {
  const { t } = useTranslation();
  const [range, setRange] = useState<RangeType>(defaultAmountRange);
  const [operations, setOperations] = useState<Operation[]>(createRandomOperations(10));
  const [sorting, setSorting] = useState<AmountSortingEnum>(AmountSortingEnum.dateAsc);
  const [operationOpen, setOperationOpen] = useState(false);
  const [operation, setOperation] = useState<Operation>(null);

  const handleShowMoreCLick = () => {
    setOperations((prevState) => [...prevState, ...createRandomOperations(10)]);
  };

  const handleRangeChange = ([min, max]: number[]): void => {
    setRange({ min, max });
  };

  const handleChangeSorting = (value: AmountSortingEnum): void => {
    setSorting(value);
  };

  const handleAddOperationClick = (): void => {
    setOperation(defaultOperation);
    setOperationOpen(true);
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

  const handleItemChange = (values: OperationProps) => {
    const itemIndex = operations.findIndex((op) => op.id === values.id);
    if (itemIndex > -1) {
      let updatedItem = { ...operations[itemIndex] };
      Object.entries(values).map(([key, val]) => {
        if (updatedItem[key as keyof OperationProps] !== val) {
          updatedItem = { ...updatedItem, [key as keyof OperationProps]: key === 'amount' ? +val : val };
        }
      });
      setOperations((prevState) => [...prevState.slice(0, itemIndex), updatedItem, ...prevState.slice(itemIndex + 1)]);
    } else {
      setOperations((prevState) => [...prevState, { ...defaultOperation, ...values }]);
    }
  };

  const filteredData = useMemo(() => {
    return operations
      .filter((op) => op.amount >= range.min && op.amount <= range.max)
      .sort((op1, op2) => operationComparator(op1, op2));
  }, [operationComparator, operations, range.max, range.min]);

  const items = useMemo(() => {
    return filteredData.map((op) => (
      <OperationCompact
        key={op.id}
        amount={op.amount}
        categoryName={op.category.name}
        name={op.name}
        desc={op.desc}
        handleClick={() => {
          setOperation(op);
          setOperationOpen(true);
        }}
      />
    ));
  }, [filteredData]);

  return (
    <>
      <Flex gap={16} wrap style={{ width: 616 }}>
        <Flex gap={16} style={{ width: '100%', height: 48 }} dir={'row'} justify={'space-between'} align={'center'}>
          <RangeSlider range={range} onChange={handleRangeChange} maxValue={maxSliderValue} />
          <AmountSorting value={sorting} onChange={handleChangeSorting} />
        </Flex>
        <Button variant={'solid'} color={'primary'} onClick={handleAddOperationClick} style={{ width: '100%' }}>
          {t('operations.addButton')}
        </Button>
        {items}
        <Button variant={'solid'} color={'primary'} onClick={handleShowMoreCLick} style={{ width: '100%' }}>
          {t('showMoreButton')}
        </Button>
      </Flex>
      {operationOpen ? (
        <Modal visible={operationOpen} setVisible={setOperationOpen}>
          <OperationFull
            id={operation.id}
            amount={operation.amount}
            categoryName={operation.category.name}
            name={operation.name}
            desc={operation.desc}
            createdAt={operation.createdAt}
            handleItemChange={handleItemChange}
          />
        </Modal>
      ) : null}
    </>
  );
}
