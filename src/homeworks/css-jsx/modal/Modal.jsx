import React from 'react';
import styles from './modal.module.sass';
import closeIcon from './close.svg';
export default function Modal({ visible = true, setVisible = () => {}, children = '' }) {
  return (
    <>
      {visible ? (
        <div className={styles.container}>
          <div className={styles.backdrop}>
            <div className={styles.modal}>
              <button className={styles.closeButton} onClick={() => setVisible(false)}>
                <img className={styles.closeIcon} src={closeIcon} alt="close" />
              </button>
              {children ? <p>{children}</p> : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
