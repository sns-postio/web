import type { Preview } from '@storybook/nextjs-vite'

import { NextIntlClientProvider } from 'next-intl';

import '../app/globals.css';
import koMessages from '../src/messages/ko.json';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="ko" messages={koMessages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;
