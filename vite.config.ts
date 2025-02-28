import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // เปลี่ยนจาก 'dist' เป็น 'build'
  }
})