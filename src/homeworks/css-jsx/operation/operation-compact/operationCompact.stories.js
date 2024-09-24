import OperationCompact from './OperationCompact';

const meta = {
  title: 'Example/OperationCompact',
  component: OperationCompact,
  tags: ['autodocs'],
  argTypes: {
    amount: { type: 'number' },
    categoryName: { type: 'string' },
    name: { type: 'string' },
    desc: { type: 'string' },
  },
};

export default meta;

export const Default = {
  args: {
    amount: 6799,
    categoryName: 'Ноутбук',
    name: 'Трата',
    desc: 'Покупка техники для офиса (ноутбук Apple MacBook Pro 14 M3 2023)',
  },
};
