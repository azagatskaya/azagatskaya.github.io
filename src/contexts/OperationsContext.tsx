import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
  MouseEventHandler,
  useEffect,
} from 'react';
import { createRandomOperations, Operation } from 'src/homeworks/ts1/3_write';
import { OperationProps } from 'src/components/operation/operation-full/OperationFull';
import { getId } from 'src/homeworks/ts1/mock/products';
import dayjs from 'dayjs';

export type OperationsContextType = {
  filteredData: Operation[];
  handleItemChange: (values: OperationProps) => void;
  range: RangeType;
  setRange: Dispatch<SetStateAction<RangeType>> | null;
  handleRangeChange: (arr: number[]) => void;
  operations: Operation[];
  maxSliderValue: number;
  sorting: AmountSortingEnum;
  handleSortingChange: (value: AmountSortingEnum) => void;
  handleShowMoreClick: MouseEventHandler<HTMLElement>;
};

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

export const OperationsContext = createContext<OperationsContextType>({
  filteredData: [],
  handleItemChange: null,
  range: defaultAmountRange,
  setRange: null,
  handleRangeChange: null,
  operations: [],
  maxSliderValue: 0,
  sorting: AmountSortingEnum.dateAsc,
  handleSortingChange: null,
  handleShowMoreClick: null,
});

export const defaultOperation: Operation = {
  id: `pr_${getId(6)}`,
  name: 'Трата',
  createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
  amount: 0,
  category: { id: '', name: '' },
  type: 'Cost',
};

const defaultOperationsArray = createRandomOperations(10);

export const OperationsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [range, setRange] = useState<RangeType>(defaultAmountRange);
  const [operations, setOperations] = useState<Operation[]>(defaultOperationsArray);
  const [sorting, setSorting] = useState<AmountSortingEnum>(AmountSortingEnum.dateAsc);

  const handleShowMoreClick = () => {
    setOperations((prevState) => [...prevState, ...createRandomOperations(10)]);
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

  const handleItemChange = (values: OperationProps) => {
    const itemIndex = operations.findIndex((op) => op.id === values.id);
    if (itemIndex > -1) {
      let updatedItem = { ...operations[itemIndex] };
      Object.entries(values).map(([key, val]) => {
        if (updatedItem[key as keyof OperationProps] !== val) {
          updatedItem = {
            ...updatedItem,
            [key === 'categoryName' ? 'category' : (key as keyof OperationProps)]:
              key === 'categoryName' ? { ...operations[itemIndex].category, name: val } : key === 'amount' ? +val : val,
          };
        }
      });
      setOperations((prevState) => [...prevState.slice(0, itemIndex), updatedItem, ...prevState.slice(itemIndex + 1)]);
    } else {
      setOperations((prevState) => [
        ...prevState,
        {
          ...defaultOperation,
          ...values,
          amount: +values.amount,
          category: { ...defaultOperation.category, name: values.name },
        },
      ]);
    }
  };

  const filteredData = useMemo(() => {
    return operations
      .filter((op) => op.amount >= range.min && op.amount <= range.max)
      .sort((op1, op2) => operationComparator(op1, op2));
  }, [operationComparator, operations, range.max, range.min]);

  return (
    <OperationsContext.Provider
      value={{
        filteredData,
        handleItemChange,
        range,
        setRange,
        handleRangeChange,
        operations,
        maxSliderValue,
        sorting,
        handleSortingChange,
        handleShowMoreClick,
      }}
    >
      {children}
    </OperationsContext.Provider>
  );
};
