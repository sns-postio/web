// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import { OverviewItem } from './OverviewItem';

const meta = {
  title: 'Channel/Analytics/OverviewItem',
  component: OverviewItem,
  args: {
    title: '총 조회수',
    value: '85,420',
  },
} satisfies Meta<typeof OverviewItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
