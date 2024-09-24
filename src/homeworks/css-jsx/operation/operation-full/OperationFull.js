import React, { useState } from 'react';
import styles from './operationFull.module.sass';
import clsx from 'clsx';
import editIcon from '../assets/edit.svg';
import saveIcon from '../assets/save.svg';

export default function OperationFull({ amount, categoryName, name, desc, date }) {
  const [mode, setMode] = useState('preview');

  const handleToggleMode = () => {
    setMode((prevState) => (prevState === 'edit' ? 'preview' : 'edit'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h4>{'Операция'}</h4>
        <button className={styles.changeModeButton}>
          <img
            className={styles.icon}
            src={mode === 'edit' ? saveIcon : editIcon}
            alt="close"
            onClick={handleToggleMode}
          />
        </button>
      </div>
      <fieldset className={clsx(styles.fieldset, styles.fieldsetTextField)}>
        <legend className={styles.legendRequired}>{'Дата'}</legend>
        <input
          type={'date'}
          disabled={mode !== 'edit'}
          className={clsx(styles.input, styles.textField, mode === 'edit' && styles.enabled)}
          id={'date'}
          name="date"
          required
          value={date}
        />
      </fieldset>
      <fieldset className={clsx(styles.fieldset, styles.fieldsetTextField)}>
        <legend className={styles.legendRequired}>{'Имя'}</legend>
        <input
          type={'text'}
          disabled={mode !== 'edit'}
          className={clsx(styles.input, styles.textField, mode === 'edit' && styles.enabled)}
          id={'name'}
          name="name"
          required
          value={name}
        />
      </fieldset>
      <fieldset className={clsx(styles.fieldset, styles.fieldsetTextField)}>
        <legend className={styles.legendRequired}>{'Сумма (руб.)'}</legend>
        <input
          type={'number'}
          disabled={mode !== 'edit'}
          className={clsx(styles.input, styles.textField, mode === 'edit' && styles.enabled)}
          id={'amount'}
          name="amount"
          required
          value={amount}
        />
      </fieldset>
      <fieldset className={clsx(styles.fieldset, styles.fieldsetTextField)}>
        <legend className={styles.legendRequired}>{'Категория'}</legend>
        <input
          type={'text'}
          disabled={mode !== 'edit'}
          className={clsx(styles.input, styles.textField, mode === 'edit' && styles.enabled)}
          id={'categoryName'}
          name="categoryName"
          required
          value={categoryName}
        />
      </fieldset>
      <fieldset className={clsx(styles.fieldset, styles.fieldsetTextArea)}>
        <legend>{'Описание'}</legend>
        <textarea
          rows={3}
          disabled={mode !== 'edit'}
          className={clsx(styles.input, styles.textArea, mode === 'edit' && styles.enabled)}
          id={'desc'}
          name="desc"
          required
          value={desc}
        />
      </fieldset>
    </div>
  );
}
