// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import { TableSet } from './TableSet';

const meta = {
  title: 'Channel/Analytics/TableSet',
  component: TableSet,
  args: {
    columns: ['채널', '조회수', '좋아요', '댓글', '공유'],
    rows: [
      ['YouTube', '85,420', '5,320', '932', '1,210'],
      ['Instagram', '72,110', '3,980', '721', '864'],
    ],
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TableSet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
