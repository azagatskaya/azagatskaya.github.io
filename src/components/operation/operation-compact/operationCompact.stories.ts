import type { Meta, StoryObj } from '@storybook/react';
import OperationCompact from './OperationCompact';
import ThemeSwitch from 'src/components/theme-switch/ThemeSwitch';

const meta: Meta<typeof OperationCompact> = {
  title: 'Example/OperationCompact',
  component: OperationCompact,
};

//  argTypes: {
//     amount: { type: 'number' },
//     categoryName: { type: 'string' },
//     name: { type: 'string' },
//     desc: { type: 'string' },
//   },

export default meta;

type Story = StoryObj<typeof ThemeSwitch>;

export const Dark: Story = {
  args: {
    amount: 6799,
    categoryName: 'Ноутбук',
    name: 'Трата',
    desc: 'Покупка техники для офиса (ноутбук Apple MacBook Pro 14 M3 2023)',
  },
  parameters: {
    theme: 'dark',
    palette: {
      primary: '#2a698c',
      secondary: '#14a37f',
      background: '#212121',
      foreground: '#001529',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      error: '#c62828',
      success: '#1b5e20',
      fontColor: '#fff',
      fontColorDisabled: '#ffffff44',
    },
  },
};

export const Light: Story = {
  args: {
    amount: 6799,
    categoryName: 'Ноутбук',
    name: 'Трата',
    desc: 'Покупка техники для офиса (ноутбук Apple MacBook Pro 14 M3 2023)',
  },
  parameters: {
    theme: 'light',
    palette: {
      primary: '#3d96c8',
      secondary: '#1de9b6',
      background: '#fff',
      foreground: '#00000011',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      error: '#d32f2f',
      success: '#2e7d32',
      fontColor: '#000',
      fontColorDisabled: '#00000044',
    },
  },
};
