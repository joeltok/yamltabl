import esbuild from 'esbuild';

async function main() {
	await esbuild.build({
    entryPoints: ['packages/vscode-extension/e2e/index.test.ts'],
    outfile: 'dist/packages/vscode-extension/e2e/index.test.cjs',
		bundle: true,
		format: 'cjs',
    target: 'es2020',
		minify: false,
		sourcemap: false,
		sourcesContent: false,
		platform: 'node',
		external: ['vscode'],
		logLevel: 'info',
	});
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});
