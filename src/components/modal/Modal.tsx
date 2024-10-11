import React from 'react';
import styles from './modal.module.sass';
import closeIcon from './close.svg';
import { Typography } from "antd";

interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  message: string;
}

export default function Modal({ visible, setVisible, message }: ModalProps): React.JSX.Element {
  return (
    <>
      {visible ? (
        <div className={styles.container}>
          <div className={styles.backdrop}>
            <div className={styles.modal}>
              <button className={styles.closeButton} onClick={() => setVisible(false)}>
                <img className={styles.closeIcon} src={closeIcon} alt="close" />
              </button>
              {message ? <Typography >{message}</Typography> : null}
            </div>
          </div>
        </div >
      ) : null
      }
    </>
  );
}
