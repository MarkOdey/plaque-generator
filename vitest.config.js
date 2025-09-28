import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true, // Optional: for using describe, it, expect globally
    environment: 'happy-dom', // Use jsdom for browser-like environment
    // Or use 'happy-dom' for a different browser-like environment
    // environment: 'happy-dom',
  },
})
