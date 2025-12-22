import esbuild from 'esbuild';

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

async function main() {
	const ctx = await esbuild.context({
    entryPoints: ['packages/vscode-extension/src/index.ts'],
    outfile: 'dist/packages/vscode-extension/lib/index.cjs',
		bundle: true,
		format: 'cjs',
    target: 'es2020',
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: 'node',
		external: ['vscode'],
		logLevel: 'info',
	});
	if (watch) {
		await ctx.watch();
	} else {
		await ctx.rebuild();
		await ctx.dispose();
	}
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});
