import OperationFull from './OperationFull';

const meta = {
  title: 'Example/OperationFull',
  component: OperationFull,
  tags: ['autodocs'],
  argTypes: {
    amount: { type: 'number' },
    categoryName: { type: 'string' },
    name: { type: 'string' },
    desc: { type: 'string' },
    date: { type: 'string' },
  },
};

export default meta;

export const Preview = {
  args: {
    amount: 6799,
    categoryName: 'Ноутбук',
    name: 'Трата',
    desc: 'Покупка техники для офиса (ноутбук Apple MacBook Pro 14 M3 2023)',
    date: '2024-09-18',
  },
};
