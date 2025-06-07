import '@testing-library/jest-dom';

jest.mock('@/constants/rules', () => ({
  createStepSchema: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
    replace: jest.fn(),
  })),
  usePathname: jest.fn(),
  useSearchParams: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
  })),
  useParams: jest.fn(),
}));
