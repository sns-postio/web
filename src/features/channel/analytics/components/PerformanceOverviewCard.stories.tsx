// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";

import { PerformanceOverviewCard } from "./PerformanceOverviewCard";

const meta = {
  title: "Channel/Analytics/PerformanceOverviewCard",
  component: PerformanceOverviewCard,
  args: {
    label: "조회 수",
    value: "85,420",
    change: 12,
  },
} satisfies Meta<typeof PerformanceOverviewCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NegativeChange: Story = {
  args: {
    label: "좋아요 수",
    value: "12,340",
    change: -5,
  },
};

export const NoValue: Story = {
  args: {
    label: "댓글 수",
    value: undefined,
    change: 0,
  },
};
