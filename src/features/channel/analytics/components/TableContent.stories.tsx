// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import { TableContent } from './TableContent';

const meta = {
  title: 'Channel/Analytics/TableContent',
  component: TableContent,
  args: {
    data: ['Youtube', '85,420', '5,320', '932'],
  },
} satisfies Meta<typeof TableContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
