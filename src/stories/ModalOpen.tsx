import React, { useState } from 'react';
import { Button, Flex, Input } from 'antd';
import Modal from '../components/modal/Modal';

export const defaultText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id volutpat leo. Integer mattis neque nec velit elementum, ac rutrum.';

export default function ModalOpen() {
  const [message, setMessage] = useState(defaultText);
  const [visible, setVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent): void => {
    setMessage((e.target as HTMLInputElement).value);
  };

  return (
    <Flex gap="middle" vertical>
      <Input value={message} onChange={handleInputChange} placeholder={'Текст для модального окна'} />
      <Button type="primary" onClick={() => setVisible(true)}>
        {'Открыть'}
      </Button>
      <Modal visible={visible} setVisible={setVisible} message={message} />
    </Flex>
  );
}
