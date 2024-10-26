import React, { ReactNode, useContext } from 'react';
import { Card, Typography } from 'antd';
import { Category, Operation } from 'src/homeworks/ts1/3_write';
import { RenameTypeField } from '../../operation/lib/renameTypeField';
import ThemeContext from '../../../contexts/ThemeContext';

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
};

export default function OperationCompact({ amount, categoryName, name, desc }: OperationCompactProps): ReactNode {
  const { palette } = useContext(ThemeContext);

  return (
    <Card
      title={<Typography style={styles.amount}>{`\u20bd ${amount}`}</Typography>}
      extra={<Typography style={styles.operationName}>{name}</Typography>}
      size="small"
      style={{ width: 300, textAlign: 'left', backgroundColor: palette.background, borderColor: palette.borderColor }}
      styles={{
        header: { width: 300, borderBottom: `1px solid ${palette.borderColor}` },
      }}
    >
      <Typography style={{ color: palette.fontColor }}>{categoryName}</Typography>
      <Typography style={{ color: palette.fontColor }}>{desc || ''}</Typography>
    </Card>
  );
}
