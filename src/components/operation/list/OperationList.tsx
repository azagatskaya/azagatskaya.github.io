import React, { CSSProperties, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Flex, Skeleton, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import AmountSorting from 'src/components/amount-sorting/AmountSorting';
import OperationCompact from 'src/components/operation/operation-compact/OperationCompact';
import { Link, useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'src/store';
import { DateRangeType, SortField, Sorting, SortType } from 'src/shared/serverTypes';
import { getDateSliderValues, getOperationsPage } from 'src/store/slices/operations';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import DateRangeSlider from 'src/components/range-slider/DateRangeSlider';
import { getId } from 'src/shared/mock/products';

type GetOperationsPageArgs =
  | {
      reset?: boolean;
      sortingValue?: Sorting;
      dateFilter?: DateRangeType;
    }
  | undefined;

export const MIN_CARD_HEIGHT = 168;

export const DATE_MIN = new Date(2023, 0, 1);
export const DATE_MAX = new Date(new Date().setMonth(new Date().getMonth() + 1));

export const defaultDateRange = { min: DATE_MIN, max: DATE_MAX };
export const defaultSorting = { type: SortType.DESC, field: SortField.date };

export default function OperationList(): ReactNode {
  const { palette, messageApi } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<Sorting>(defaultSorting);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useSelector((state: AppState) => state.auth?.role);
  const operations = useSelector((state: AppState) => state.operations?.data || []);
  const pagination = useSelector((state: AppState) => state.operations?.pagination);
  const sliderRange = useSelector((state: AppState) => ({
    min: new Date(state?.operations?.sliderRange?.min),
    max: new Date(state?.operations?.sliderRange?.max),
  }));
  const dispatch = useDispatch<AppDispatch>();
  const [pageNumber, setPageNumber] = useState(1);
  const [dateRange, setDateRange] = useState<DateRangeType>(defaultDateRange);
  const containerRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getDateSliderValues()).unwrap();
      } catch (err) {
        messageApi.error(t(`error.${err}`));
      }
    })();
  }, [dispatch, messageApi, t]);

  const isDateFilterOn = useMemo(
    () =>
      sliderRange && dateRange
        ? new Date(sliderRange.min).valueOf() !== new Date(dateRange.min).valueOf() ||
          new Date(sliderRange.max).valueOf() !== new Date(dateRange.max).valueOf()
        : false,
    [dateRange, sliderRange]
  );

  const getMoreOperations = useCallback(
    async ({ reset, sortingValue, dateFilter }: GetOperationsPageArgs) => {
      if (isDateFilterOn || !pagination || pagination?.pageSize * pagination?.pageNumber < pagination?.total) {
        try {
          const response = await dispatch(
            getOperationsPage({
              pageNumber: reset ? 1 : pageNumber,
              sorting: sortingValue ?? sorting,
              date: isDateFilterOn
                ? {
                    gte: (dateFilter ? dateFilter : dateRange).min.toISOString(),
                    lte: (dateFilter ? dateFilter : dateRange).max.toISOString(),
                  }
                : null,
            })
          );

          if (!('error' in response)) setPageNumber((prevState) => (reset ? 1 : prevState + 1));
        } catch (err) {
          messageApi.error(t(`error.${err}`));
        }
      }
    },
    [dateRange, dispatch, isDateFilterOn, messageApi, pageNumber, pagination, sorting, t]
  );

  const handleAddOperationClick = (): void => {
    navigate(`/operations/create`);
  };

  useEffect(() => {
    if (operations.length) {
      const datesInMs = operations.map((op) => new Date(op.date).valueOf());
      const min = Math.min(...datesInMs);
      const max = Math.max(...datesInMs);

      if (!isDateFilterOn) setDateRange({ min: new Date(min), max: new Date(max) });
    } else {
      if (!isDateFilterOn) setDateRange(defaultDateRange);
    }
  }, [isDateFilterOn, operations]);

  const handleDateRangeChange = ([min, max]: number[]): void => {
    setDateRange({ min: new Date(min), max: new Date(max) });
    getMoreOperations({ reset: true, dateFilter: { min: new Date(min), max: new Date(max) } });
  };

  const handleSortingChange = (value: Sorting): void => {
    setSorting(value);
    getMoreOperations({ reset: true, sortingValue: value });
  };

  const observerCallbackFunction = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        getMoreOperations({});
      }
    },
    [getMoreOperations]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallbackFunction, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (containerRef.current) observer.observe(containerRef?.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef?.current);
    };
  }, [observerCallbackFunction, containerRef]);

  const items = useMemo(() => {
    return (
      <Flex
        gap={16}
        wrap
        style={{
          width: 646,
          height: 'calc(100vh - 220px)',
          paddingRight: 12,
          overflowX: 'hidden',
        }}
      >
        {operations.map((op) =>
          isAdmin ? (
            <Link
              key={`link_${op?.id.toString() || getId(16)}`}
              to={`/operations/${op?.id}`}
              state={{ previousLocation: location }}
            >
              <OperationCompact
                key={op?.id || getId(16)}
                amount={op?.amount || 0}
                categoryName={op?.category?.name || ''}
                name={op?.name || ''}
                date={op?.date || null}
                desc={op?.desc || ''}
              />
            </Link>
          ) : (
            <OperationCompact
              key={op?.id || getId(16)}
              amount={op?.amount || 0}
              categoryName={op?.category?.name || ''}
              name={op?.name || ''}
              date={op?.date || null}
              desc={op?.desc || ''}
            />
          )
        )}
        {!pagination || pagination?.pageSize * pagination?.pageNumber < pagination?.total ? (
          <Flex gap={16} ref={containerRef}>
            <Skeleton.Input
              key={'sk_1'}
              active={true}
              size={'default'}
              style={{ width: 300, height: 108, backgroundColor: palette.borderColor }}
            />
            <Skeleton.Input
              key={'sk_2'}
              active={true}
              size={'default'}
              style={{ width: 300, height: 108, backgroundColor: palette.borderColor }}
            />
          </Flex>
        ) : (
          <Typography style={{ textAlign: 'center', width: '100%', color: palette.fontColor }}>
            {t('operations.msgAllOperationsShown')}
          </Typography>
        )}
      </Flex>
    );
  }, [operations, isAdmin, location, pagination, palette.borderColor, palette.fontColor, t]);

  return (
    <Flex gap={16} wrap style={{ width: 646 }}>
      <Flex gap={16} style={{ width: '100%', height: 48 }} dir={'row'} justify={'space-between'} align={'center'}>
        <DateRangeSlider range={dateRange} onChange={handleDateRangeChange} sliderMinMax={sliderRange} />
        <AmountSorting onChange={handleSortingChange} />
      </Flex>
      <Button variant={'solid'} color={'primary'} onClick={handleAddOperationClick} style={{ width: '100%' }}>
        {t('operations.addButton')}
      </Button>
      {items}
      {operations.length === 0 ? (
        isDateFilterOn ? (
          <>
            <Typography style={styles.typo(palette.fontColor)}>{t('operations.msgNoData')}</Typography>
            <Typography style={styles.typo(palette.fontColor)}>{t('operations.msgTryChangeFilters')}</Typography>
          </>
        ) : (
          <Typography style={styles.typo(palette.fontColor)}>{t('operations.msgNoData')}</Typography>
        )
      ) : null}
    </Flex>
  );
}

const styles = {
  typo: (color: string): CSSProperties => ({ color, width: '100%', textAlign: 'center', marginTop: '100px' }),
};
