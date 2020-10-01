import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

const plugins = [
  typescript(),
  alias({
    entries: [
      { find: 'react', replacement: 'preact/compat' },
      { find: 'react-dom', replacement: 'preact/compat' },
    ],
  }),
  nodeResolve(),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
];

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/bundle.min.mjs',
        format: 'es',
        plugins: [terser()],
      },
    ],
    plugins:
      process.env.BUILD === 'dev'
        ? [
            ...plugins,
            serve({
              contentBase: ['dist', 'public'],
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            }),
          ]
        : plugins,
  },
  {
    input: 'src/index.tsx',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
      },
    ],
    external: [
      'react',
      'react-dom',
      'perfect-arrows',
      'preact/hooks',
      'preact',
    ],
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist/types/',
        rootDir: 'src/',
      }),
    ],
  },
];
