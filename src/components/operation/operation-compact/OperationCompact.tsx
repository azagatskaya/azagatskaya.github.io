import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Card, Tooltip, Typography } from 'antd';
import { Category, Operation } from 'src/shared/serverTypes';
import { RenameTypeField } from '../../operation/lib/renameTypeField';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store';
import dayjs from 'dayjs';
import { MIN_CARD_HEIGHT } from 'src/components/operation/list/OperationList';

type RenamedCatName = RenameTypeField<Pick<Category, 'name'>, 'name', 'categoryName'>;

type OperationProps = Pick<Operation, 'amount' | 'name' | 'date' | 'desc'>;
type OperationCompactProps = OperationProps & RenamedCatName;

const styles = {
  operationName: {
    color: '#3d96c8',
    fontSize: 18,
    fontWeight: 500,
    width: 190,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  amount: {
    color: '#f44336',
    fontSize: 18,
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
};

const useMountTransition = (isMounted: boolean, unmountDelay: number) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    let timeoutId: null | ReturnType<typeof setTimeout> = null;

    if (isMounted && !hasTransitionedIn) {
      setHasTransitionedIn(true);
    } else if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [unmountDelay, isMounted, hasTransitionedIn]);

  return hasTransitionedIn;
};

export default function OperationCompact({ amount, categoryName, name, desc, date }: OperationCompactProps): ReactNode {
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const [isMounted, setIsMounted] = useState(false);
  const hasTransitionedIn = useMountTransition(isMounted, 1000);
  const isAdmin = useSelector((state: AppState) => state.auth?.role);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card
      title={<Typography style={styles.amount}>{`\u20bd ${amount}`}</Typography>}
      extra={
        <Tooltip title={name}>
          <Typography style={styles.operationName}>{name}</Typography>
        </Tooltip>
      }
      size="small"
      style={{
        width: 300,
        minHeight: MIN_CARD_HEIGHT,
        textAlign: 'left',
        cursor: isAdmin ? 'pointer' : 'default',
        backgroundColor: palette.background,
        borderColor: palette.borderColor,
        resize: 'vertical',
        opacity: 0,
        transform: 'translateY(15px)',
        transition: 'opacity 1s ease, transform 1s ease',
        ...(hasTransitionedIn && isMounted ? styles.visible : {}),
      }}
      styles={{
        header: { width: 300, borderBottom: `1px solid ${palette.borderColor}` },
      }}
    >
      <Typography style={{ color: palette.fontColor, textAlign: 'left' }}>
        {dayjs(date).format('DD-MM-YYYY')}
      </Typography>
      <Typography style={{ color: palette.fontColor }}>{categoryName}</Typography>
      <Typography style={{ color: palette.fontColor }}>{desc || ''}</Typography>
    </Card>
  );
}
