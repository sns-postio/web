// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import AnalyticsSection from './analytics-section';

const meta = {
  title: 'Channel/Analytics/AnalyticsSection',
  component: AnalyticsSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AnalyticsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

