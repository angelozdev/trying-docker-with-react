import "@testing-library/jest-dom";

global.fetch = jest.fn().mockReturnValue({ json: jest.fn() });
