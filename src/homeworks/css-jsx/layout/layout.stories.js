import Layout from './Layout';

const meta = {
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
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};
