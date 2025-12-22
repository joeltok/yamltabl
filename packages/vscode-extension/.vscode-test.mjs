import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
  extensionDevelopmentPath: '../../dist/packages/vscode-extension',
	files: '../../dist/packages/vscode-extension/e2e/**/*.test.cjs',
	cachePath: 'tmp/vscode-test-binaries',
	launchArgs: [
    '--user-data-dir', 'tmp/vscode-test-user-data',
    '--extensions-dir', 'tmp/vscode-test-extensions'
  ],
  mocha: {
    timeout: 60000
  }
});
