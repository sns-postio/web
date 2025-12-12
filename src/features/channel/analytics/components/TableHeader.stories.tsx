// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import { TableHeader } from './TableHeader';

const meta = {
  title: 'Channel/Analytics/TableHeader',
  component: TableHeader,
  args: {
    columns: ['채널', '조회수', '좋아요', '댓글'],
  },
} satisfies Meta<typeof TableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
