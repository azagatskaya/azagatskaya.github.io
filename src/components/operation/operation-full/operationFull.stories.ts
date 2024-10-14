import type { Meta, StoryObj } from '@storybook/react';
import OperationFull from './OperationFull';
import ThemeSwitch from 'src/components/theme-switch/ThemeSwitch';

const meta: Meta<typeof OperationFull> = {
  title: 'Example/OperationFull',
  component: OperationFull,
};

export default meta;

type Story = StoryObj<typeof ThemeSwitch>;

export const Dark: Story = {
  args: {
    amount: 6799,
    categoryName: 'Ноутбук',
    name: 'Трата',
    desc: 'Покупка техники для офиса (ноутбук Apple MacBook Pro 14 M3 2023)',
    createdAt: '2024-09-18',
  },
  parameters: {
    theme: 'dark',
    lang: 'ru',
    palette: {
      primary: '#2a698c',
      secondary: '#14a37f',
      background: '#121212',
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
    createdAt: '2024-09-18',
  },
  parameters: {
    lang: 'ru',
    theme: 'light',
    palette: {
      primary: '#3d96c8',
      secondary: '#c83d95',
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

export const English: Story = {
  args: {
    amount: 6799,
    categoryName: 'Ноутбук',
    name: 'Трата',
    desc: 'Покупка техники для офиса (ноутбук Apple MacBook Pro 14 M3 2023)',
    createdAt: '2024-09-18',
  },
  parameters: {
    lang: 'en',
    theme: 'light',
    palette: {
      primary: '#3d96c8',
      secondary: '#c83d95',
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
