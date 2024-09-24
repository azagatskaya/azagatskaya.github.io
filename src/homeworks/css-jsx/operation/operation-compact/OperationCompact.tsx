import React from 'react';
import styles from './operationCompact.module.sass';
import rubIcon from '../assets/rub.svg';

type OperationCompactProps = {
  amount: number;
  categoryName: string;
  name: string;
  desc: string;
};

export default function OperationCompact({ amount, categoryName, name, desc }: OperationCompactProps) {
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
