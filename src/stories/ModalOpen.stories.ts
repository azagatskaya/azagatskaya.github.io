import type { Meta } from '@storybook/react';
import ModalOpen from './ModalOpen';

const meta: Meta<typeof ModalOpen> = {
  title: 'Example/ModalOpen',
  component: ModalOpen,
  argTypes: {
    visible: { type: 'boolean' },
  },
};

export default meta;

export const Default = {
  args: {
    visible: false,
  },
};
