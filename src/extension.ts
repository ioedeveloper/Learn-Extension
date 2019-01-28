// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "sample-typescript-extension" is now active!');

	let activeEditor = vscode.window.activeTextEditor;
	if(activeEditor){
		logActivity(activeEditor);
	}

	vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
		activeEditor = editor;
		logActivity(activeEditor);
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument((event)=>{
		if(activeEditor && event.document === activeEditor.document){
			logActivity(activeEditor);
		}
	}, null, context.subscriptions);

	function logActivity(textEditor: vscode.TextEditor | undefined){
		if(typeof (textEditor) !== 'undefined'){
			console.log('Options: ', textEditor.options);
			console.log('Line Count: ',textEditor.document.lineCount);
			console.log('Selection: ', textEditor.selection);
			console.log('Selections: ', textEditor.selections);
			console.log('View Column: ', textEditor.viewColumn);
			console.log('Visible Ranges', textEditor.visibleRanges);
		}else{
			console.log('No active editor found');
		}
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
