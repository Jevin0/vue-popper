import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

import './vite.init'

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@core': path.resolve(__dirname, '../', './packages/core'),
        '@popper': path.resolve(__dirname, '../', './packages/component'),
      }
    },
    plugins: [
      vue(),
      vueJsx(),
    ],
    server: {
      // open: true
    }
  }
})
