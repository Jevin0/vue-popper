import Resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'

const inputPath = './index.ts'
const external = ['vue']

export default defineConfig({
	input: inputPath,
	output: [
		{
			file: `./dist/popper.esm.js`,
      format: 'es',
		},
		{
			file: `./dist/popper.mjs.js`,
      format: 'es',
		},
		{
			name: 'LayPopperCore',
			file: `./dist/popper.cjs.js`,
      format: 'cjs',
		},
		{
			name: 'LayPopperCore',
			file: `./dist/popper.umd.js`,
      format: 'umd',
			globals: {
				'vue': 'Vue'
			}
		}
	],
	external,
	plugins: [
		Resolve(),
		typescript()
	]
}) 