import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {fileURLToPath} from "node:url";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      tailwindcss()
  ],
    base: process.env.VITE_BASE_PATH || '/linah-ai',
    resolve: {
        alias:{
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
