import * as assert from 'assert';
import * as path from 'path';

import * as vscode from 'vscode';

suite('Markdown Preview Yamltabl Support', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Open basic.md and markdown preview', async () => {
		const uri = vscode.Uri.file(
      path.join(__dirname, '../samples/fixtures/basic.md')
    );

    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc);
    await vscode.commands.executeCommand('markdown.showPreviewToSide', uri);


		await new Promise(resolve => setTimeout(resolve, 5000)); 
		// await new Promise(() => {}); // for extended debugging
	});
});
