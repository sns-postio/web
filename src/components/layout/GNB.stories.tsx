// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import { GNBBaseComponent } from './GNB';

const meta = {
  title: 'common/Layout/GNB',
  component: GNBBaseComponent,
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
    locale: 'ko',
    isLoggedIn: true,
    loginHref: '/auth/login',
    isLoggingOut: false,
  },
} satisfies Meta<typeof GNBBaseComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLogout: () => {},
  },
};
