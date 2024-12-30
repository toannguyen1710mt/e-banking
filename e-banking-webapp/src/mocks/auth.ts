// Libs
import { Session } from 'next-auth';

// Interfaces
import { IUser } from '@/interfaces';

export const MOCK_DATA_USER: IUser = {
  accounts: [
    {
      documentId: '123',
      accountNumber: '123455556666',
      balance: 38000,
      currency: '$',
      id: 36,
      name: 'thong1',
      type: 'Main',
    },
    {
      documentId: '234',
      accountNumber: '123455557878',
      balance: 33000,
      currency: '$',
      id: 37,
      name: 'thong2',
      type: 'Savings',
    },
    {
      documentId: '345',
      accountNumber: '123455556789',
      balance: 35000,
      currency: '$',
      id: 38,
      name: 'thong1',
      type: 'Checkings',
    },
  ],
  avatar: 'https://i.ibb.co/SKHPQYq/avatar-default.webp',
  country: 'UK',
  email: 'thong+1@gmail.com',
  id: 43,
  phone: '123456789000',
  postal: '226',
  token: '123456',
  username: 'thong',
  documentId: '',
  provider: '',
  confirmed: false,
  blocked: false,
  createdAt: '',
  updatedAt: '',
  publishedAt: '',
};

export const MOCK_SESSION_DATA: Session = {
  user: {
    email: 'thong+1@gmail.com',
    id: 43,
    documentId: 'c61o0tyzgnguwig7kpr62n8t',
    username: 'thong',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2024-12-18T02:49:42.098Z',
    updatedAt: '2024-12-18T09:03:34.619Z',
    publishedAt: '2024-12-18T02:52:27.022Z',
    postal: '226',
    phone: '123456789000',
    country: 'UK',
    avatar: 'https://i.ibb.co/SKHPQYq/avatar-default.webp',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTczNDU5OTk2MCwiZXhwIjoxNzM3MTkxOTYwfQ.',
  },
  expires: '2024-12-20T10:17:30.214Z',
};
