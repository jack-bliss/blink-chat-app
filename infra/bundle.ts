import * as esbuild from 'esbuild';
import { join } from 'path';

esbuild.build({
  entryPoints: [
    join(__dirname, `../src/client/conversations.tsx`),
    join(__dirname, `../src/client/conversations.css`),
    join(__dirname, `../src/client/markdown.css`),
  ],
  bundle: true,
  outdir: 'bucket/bundles',
  platform: 'browser',
  alias: {
    react: 'preact/compat',
    'react-dom/test-utils': 'preact/test-utils',
    'react-dom': 'preact/compat', // Must be below test-utils
    'react/jsx-runtime': 'preact/jsx-runtime',
  },
});
