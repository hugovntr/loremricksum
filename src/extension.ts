// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "loremricksum" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.loremricksum', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const data = axios.get('http://loremricksum.com/api/?paragraphs=4&quotes=2')
			.then((data) => {
				const paragraphs = data.data.data;
				insertText(paragraphs.join("\n"));
			});
		vscode.window.showInformationMessage('Wubba Lubba Dub Dub!');
	});

	context.subscriptions.push(disposable);
}

function insertText(sentence: string)
{
	let editor = vscode.window.activeTextEditor;
	if (editor !== undefined)
	{
		editor.edit((edit) => {
			if (editor !== undefined)
			{
				editor.selections.forEach((selection) => {
					edit.delete(selection);
					edit.insert(selection.start, sentence);
					edit.insert(selection.start, "\n");
				})
			}
		})
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
