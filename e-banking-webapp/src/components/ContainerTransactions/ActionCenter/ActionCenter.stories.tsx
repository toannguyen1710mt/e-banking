import type { Meta, StoryObj } from '@storybook/react';
import { ActionCenter } from '.';

const meta = {
  title: 'Components/ActionCenter',
  component: ActionCenter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ActionCenter>;

export default meta;

type Story = StoryObj<typeof ActionCenter>;

export const Default: Story = {
  args: {
    totalTransferReceived: 1200,
    totalTransferSent: 800,
    session: {
      user: {
        email: 'phong+1@gmail.com',
        id: 82,
        documentId: 'ldrhsspx98g1ijlabnrclht8',
        username: 'phong',
        provider: 'local',
        confirmed: true,
        blocked: false,
        postal: '344',
        phone: '324345346345',
        country: 'United States',
        avatar: 'https://i.ibb.co/SKHPQYq/avatar-default.webp',
        announcements: true,
        updates: true,
        feedbacksAndSurvey: true,
        events: true,
        generalNotification: true,
        promotions: true,
        eventsNearMe: true,
        createdAt: '2025-01-15T04:54:45.295Z',
        updatedAt: '2025-01-15T04:54:45.623Z',
        publishedAt: '2025-01-15T04:54:45.296Z',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODIsImlhdCI6MTczNzA4NzMwNiwiZXhwIjoxNzM5Njc5MzA2fQ.6VPWVxS169pVk-4xBcC9TOj2e1DS10b_l3t9Grs5pU0',
      },
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    },
  },
};
