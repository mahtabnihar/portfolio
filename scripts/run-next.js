#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');

const polyfill = path.join(__dirname, 'node-polyfill.js');
const nextBin = require.resolve('next/dist/bin/next');
const existing = process.env.NODE_OPTIONS || '';
const requireFlag = `--require ${polyfill}`;

const child = spawn(process.execPath, ['-r', polyfill, nextBin, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_OPTIONS: existing.includes(polyfill) ? existing : `${existing} ${requireFlag}`.trim(),
  },
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code == null ? 1 : code);
});
