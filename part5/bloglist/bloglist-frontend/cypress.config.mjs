import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    env: {
      BACKEND: 'http://localhost:3003/api'
    },
    setupNodeEvents(on, config) {
      
    }
  }
})