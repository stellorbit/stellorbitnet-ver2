import { spawn } from 'node:child_process';

const defaultProjectName = 'stellorbitnet-ver2';
const projectName =
  process.env.CLOUDFLARE_PAGES_PROJECT_NAME || defaultProjectName;
const branch = process.env.CLOUDFLARE_PAGES_BRANCH?.trim();
const wranglerArgs = [
  'wrangler',
  'pages',
  'deploy',
  'dist',
  '--project-name',
  projectName,
];

if (branch) {
  wranglerArgs.push('--branch', branch);
}

const isWin = process.platform === 'win32';
const pnpmCmd = isWin ? 'pnpm.cmd' : 'pnpm';

const child = spawn(pnpmCmd, ['exec', ...wranglerArgs], {
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
