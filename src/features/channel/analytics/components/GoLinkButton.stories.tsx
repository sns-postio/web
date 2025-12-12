// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import { GoLinkButton } from './GoLinkButton';

const meta = {
  title: 'Channel/Analytics/GoLinkButton',
  component: GoLinkButton,
  args: {
    href: '#',
    label: '자세히 보기',
  },
} satisfies Meta<typeof GoLinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
