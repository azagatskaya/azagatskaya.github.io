import type { Meta } from '@storybook/react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Example/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    visible: { type: 'boolean' },
    message: { type: 'string' },
  },
};

export default meta;

export const Visible = {
  args: {
    visible: true,
  },
};
export const Hidden = {
  args: {
    visible: false,
  },
};
