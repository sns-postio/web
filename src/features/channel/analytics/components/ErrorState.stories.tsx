// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import { ErrorState, NoConnectionError, NoDataError, TemporaryError } from './ErrorState';

const meta = {
  title: 'Channel/Analytics/ErrorState',
  component: ErrorState,
} satisfies Meta<typeof ErrorState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TemporaryVariant: Story = {
  render: () => <TemporaryError />,
};

export const NoDataVariant: Story = {
  render: () => <NoDataError buttonHref="/analytics" />,
};

export const NoConnectionVariant: Story = {
  render: () => <NoConnectionError buttonHref="/channel/integration" />,
};
