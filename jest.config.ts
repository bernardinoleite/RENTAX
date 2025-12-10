// jest.config.ts
import { Config } from "jest";

const config: Config = {
  bail: true,
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  preset: "ts-jest/presets/default-esm",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

export default config;
