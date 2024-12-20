import "@testing-library/jest-dom";

jest.mock('@/constants/rules', () => ({
    createStepSchema: jest.fn(),
}));