import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/*.stories.tsx',
    '!**/node_modules/**',
    '!**/*.config.ts',
    '!<rootDir>/.storybook/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/src/app/**',
    '!<rootDir>/src/constants/**',
    '!<rootDir>/src/mocks/**',
    '!<rootDir>/src/themes/**',
    '!<rootDir>/src/types/**',
    '!<rootDir>/src/interfaces/**',
    '!<rootDir>/src/providers/**',
  ],
};

export default createJestConfig(customJestConfig);
