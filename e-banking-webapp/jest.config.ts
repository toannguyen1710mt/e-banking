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
    'src/components/**',
    'src/hooks/**',
    'src/services/**',
    'src/utils/**',
    '!src/components/**/*.snap',
  ],
};

export default createJestConfig(customJestConfig);
