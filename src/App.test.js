import { render } from "@testing-library/react";

import App from "./App";

// Mock react-snowfall (uses ESM syntax incompatible with Jest's CommonJS transform)
jest.mock("react-snowfall", () => ({ __esModule: true, default: () => null }));

// Mock the entire AuthContext to avoid Firebase lifecycle complexity in tests
jest.mock("./contexts/AuthContext", () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => ({
    currentUser: null,
    loading: false,
    signIn: jest.fn(),
    signOut: jest.fn(),
    profile: null,
    loadingProfile: false,
    updateProfile: jest.fn(),
  }),
}));

// Mock Firebase modules (still needed by direct firebase.js import in App)
jest.mock("./firebase", () => ({ app: {}, auth: {}, db: {} }));

test("renders without crashing", () => {
  render(<App />);
  expect(document.body).toBeDefined();
});
