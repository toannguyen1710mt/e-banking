import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-fixed-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@app/auth': '<rootDir>/authConfig/mocks/auth.ts',
    'next-auth/providers/credentials':
      '<rootDir>/authConfig/mocks/next-auth-providers-credentials.ts',
    'next-auth': '<rootDir>/authConfig/mocks/next-auth.ts',
  },
  collectCoverageFrom: [
    'src/app/**',
    'src/components/**',
    'src/hooks/**',
    'src/services/**',
    'src/utils/**',
    'src/layouts/**',
    '!src/components/**/*.snap',
    '!src/layouts/**/*.snap',
    '!src/**/*.stories.ts',
    '!src/**/*.stories.tsx',
    '!src/app/**/route.ts',
    '!src/app/**/robots.ts',
    '!src/app/**/sitemap.ts',
    '!src/app/**/layout.tsx',
    '!src/app/**/loading.tsx',
  ],
  maxWorkers: 7, // Increase the number of workers, or set to "50%" if your machine can handle more parallel tests
  testRetries: 6, // Increase the number of retries for failed tests
};

export default createJestConfig(customJestConfig);
