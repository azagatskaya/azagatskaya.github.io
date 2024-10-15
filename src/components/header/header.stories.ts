import type { Meta, StoryObj } from '@storybook/react';
import Header from '../../components/header/Header';

const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Ru: Story = {
  parameters: {
    lang: 'ru',
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

export const En: Story = {
  parameters: {
    lang: 'en',
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
