import { Button } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';

type PropsType = {
  operationEdit: boolean;
  setOperationEdit: Dispatch<SetStateAction<boolean>> | null;
};

export default function OperationEditButton({ operationEdit, setOperationEdit }: PropsType) {
  return (
    <Button
      color="danger"
      variant="solid"
      onClick={() => {
        setOperationEdit((prevState: boolean) => !prevState);
      }}
    >
      {operationEdit ? 'Close' : 'Edit operation'}
    </Button>
  );
}
