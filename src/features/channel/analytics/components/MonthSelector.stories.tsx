// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import { MonthSelector, MonthSelectorContent } from './MonthSelector';

const sampleMonths = [
  { year: 2024, month: 9 },
  { year: 2024, month: 10 },
  { year: 2024, month: 11 },
  { year: 2024, month: 12 },
];

const meta = {
  title: 'Channel/Analytics/MonthSelector',
  component: MonthSelector,
  parameters: {
    layout: 'centered',
  },
  args: {
    months: sampleMonths,
    defaultValue: sampleMonths[1],
  },
} satisfies Meta<typeof MonthSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <MonthSelector {...args}>
      {(args.months ?? []).map((month) => (
        <MonthSelectorContent key={`${month.year}-${month.month}`} value={month}>
          <div className="text-center">
            {month.year}년 {month.month}월 데이터
          </div>
        </MonthSelectorContent>
      ))}
    </MonthSelector>
  ),
};
