// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import { AnalyticsCard } from './AnalyticsCard';

const meta = {
  title: 'Channel/Analytics/AnalyticsCard',
  component: AnalyticsCard,
  args: {
    title: '통합 분석',
    children: (
      <p className="text-sm text-muted-foreground">
        주요 지표를 카드 형태로 담는 컨테이너입니다.
      </p>
    ),
  },
} satisfies Meta<typeof AnalyticsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
