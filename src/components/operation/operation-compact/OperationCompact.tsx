import React, { CSSProperties, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Card, Typography } from 'antd';
import { Category, Operation } from 'src/homeworks/ts1/3_write';
import { RenameTypeField } from '../../operation/lib/renameTypeField';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';

type RenamedCatName = RenameTypeField<Pick<Category, 'name'>, 'name', 'categoryName'>;

type OperationProps = Pick<Operation, 'amount' | 'name' | 'desc'>;
type OperationCompactProps = OperationProps & RenamedCatName;

const styles = {
  operationName: {
    color: '#3d96c8',
    fontSize: 18,
    fontWeight: 500,
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

const resizeButtonStyle: CSSProperties = {
  position: 'absolute',
  bottom: 1,
  left: 120,
  width: 60,
  height: 2,
  borderRadius: 1,
  cursor: 'ns-resize',
};

export type CardHeight = number;

const MIN_CARD_HEIGHT = 108;

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

export default function OperationCompact({ amount, categoryName, name, desc }: OperationCompactProps): ReactNode {
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const [cardHeight, setCardHeight] = useState(MIN_CARD_HEIGHT);
  const [isMounted, setIsMounted] = useState(false);
  const hasTransitionedIn = useMountTransition(isMounted, 1000);
  const root = useRef<HTMLDivElement>();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sizesCopy = useRef(cardHeight);
  sizesCopy.current = cardHeight;

  const { onMouseDownResizer } = useMemo(() => {
    let start = { x: 0, y: 0, width: 300, height: MIN_CARD_HEIGHT };

    const safeSetSizes = (_cardHeight: CardHeight) => {
      setCardHeight(_cardHeight < MIN_CARD_HEIGHT ? MIN_CARD_HEIGHT : Math.round(_cardHeight));
    };
    const move = (e: MouseEvent) => {
      e.preventDefault();
      const rect = root.current.getBoundingClientRect();
      const y = start.y - (e.clientY - rect.y);
      safeSetSizes(start.height - y);
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };

    return {
      onMouseDownResizer: (e: React.MouseEvent) => {
        e.stopPropagation();
        const rect = root.current.getBoundingClientRect();
        start = {
          x: e.clientX - rect.x,
          y: e.clientY - rect.y,
          width: 300,
          height: sizesCopy.current,
        };
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
      },
    };
  }, []);

  return (
    <Card
      ref={root}
      title={<Typography style={styles.amount}>{`\u20bd ${amount}`}</Typography>}
      extra={<Typography style={styles.operationName}>{name}</Typography>}
      size="small"
      style={{
        width: 300,
        textAlign: 'left',
        cursor: 'pointer',
        backgroundColor: palette.background,
        borderColor: palette.borderColor,
        minHeight: cardHeight,
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
      <Typography style={{ color: palette.fontColor }}>{categoryName}</Typography>
      <Typography style={{ color: palette.fontColor }}>{desc || ''}</Typography>
      <div
        style={{ ...resizeButtonStyle, backgroundColor: palette.fontColorDisabled }}
        onMouseDown={onMouseDownResizer}
      ></div>
    </Card>
  );
}
