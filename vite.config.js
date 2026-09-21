import { build, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Subojit-Portfolio/',
  plugins: [react()],
})