import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@app/auth': '<rootDir>/authConfig/mocks/auth.ts',
    'next-auth/providers/credentials':
      '<rootDir>/authConfig/mocks/next-auth-providers-credentials.ts',
    'next-auth': '<rootDir>/authConfig/mocks/next-auth.ts',
  },
  collectCoverageFrom: [
    'src/components/**',
    'src/hooks/**',
    'src/services/**',
    'src/utils/**',
    '!src/components/**/*.snap',
    '!src/**/*.stories.ts',
    '!src/**/*.stories.tsx',
  ],
};

export default createJestConfig(customJestConfig);
