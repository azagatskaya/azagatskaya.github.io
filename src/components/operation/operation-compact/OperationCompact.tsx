import React from 'react';
import styles from './operationCompact.module.sass';
import rubIcon from '../assets/rub.svg';
import { Category, Operation } from 'src/homeworks/ts1/3_write';
import { RenameTypeField } from 'src/components/operation/lib/renameTypeField';

type RenamedCatName = RenameTypeField<Pick<Category, 'name'>, 'name', 'categoryName'>;

type OperationProps = Pick<Operation, 'amount' | 'name' | 'desc'>;
type OperationCompactProps = OperationProps & RenamedCatName;

export default function OperationCompact({
  amount,
  categoryName,
  name,
  desc,
}: OperationCompactProps): React.JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.amount}>
          <img className={styles.rubIcon} src={rubIcon} alt="rub" />
          {amount}
        </div>
        <div className={styles.operationName}>{name}</div>
      </div>
      <div>{categoryName}</div>
      <div className={styles.description}>{desc || ''}</div>
    </div>
  );
}
