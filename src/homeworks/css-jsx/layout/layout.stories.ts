import type { Meta } from '@storybook/react';
import Layout from './Layout';

const meta: Meta<typeof Layout> = {
  title: 'Example/Layout',
  component: Layout,
  tags: ['autodocs'],
};

export default meta;

export const Main = {
  args: {
    children: ['Lorem ipsum'],
  },
  parameters: {
    layout: 'fullscreen',
  },
};
