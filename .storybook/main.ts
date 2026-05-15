import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-docs'
  ],
  "framework": "@storybook/react-vite",
  viteFinal: async (config) => {
    config.base = '/suus-component-library/';
    return config;
  },
};
export default config;
