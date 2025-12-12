// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import { AlertEmptyState } from './AlertEmptyState';

const meta = {
  title: 'Channel/Analytics/AlertEmptyState',
  component: AlertEmptyState,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: '분석하기 충분한 데이터가 없습니다',
    description: '일정량 이상의 활동 데이터가 쌓이면 대시보드가 표시됩니다',
  },
} satisfies Meta<typeof AlertEmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
