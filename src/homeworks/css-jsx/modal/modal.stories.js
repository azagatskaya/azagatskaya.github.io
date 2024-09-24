import Layout from './Modal';

const meta = {
  title: 'Example/Modal',
  component: Layout,
  tags: ['autodocs'],
  argTypes: {
    visible: { type: 'boolean' },
    children: { type: 'string' },
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
