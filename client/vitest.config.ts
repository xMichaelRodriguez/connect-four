// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    deps: {
      inline: ['framer-motion'],
    },
  },
});
