// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import { ChannelTabs } from './channel-tabs';

const sampleTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'facebook', label: 'Facebook', isDisabled: true },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
];

const meta = {
  title: 'Channel/Analytics/ChannelTabs',
  component: ChannelTabs,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-muted/10 p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    tabs: sampleTabs,
    defaultTab: 'overview',
  },
} satisfies Meta<typeof ChannelTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
