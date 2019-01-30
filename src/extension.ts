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
		// logActivity(activeEditor);
		triggerUpdateDecorations();
	}

	vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
		activeEditor = editor;
		// logActivity(activeEditor);
		triggerUpdateDecorations();
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument((event)=>{
		if(activeEditor && event.document === activeEditor.document){
			// logActivity(activeEditor);
			triggerUpdateDecorations();
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

	let timeout : NodeJS.Timer | null = null;
	function triggerUpdateDecorations() {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(updateDecorations, 500);
	}

	const decorationType = vscode.window.createTextEditorDecorationType({
		borderWidth: '1px',
		borderStyle: 'solid',
		overviewRulerColor: 'blue',
		overviewRulerLane: vscode.OverviewRulerLane.Right,
		light: {
			// this color will be used in light color themes
			borderColor: 'darkblue'
		},
		dark: {
			// this color will be used in dark color themes
			borderColor: 'lightblue'
		}
	});

	function updateDecorations() {
		if (!activeEditor) {
			return;
		}
		const regEx = /\d+/g;
		const text = activeEditor.document.getText();
		const smallNumbers: vscode.DecorationOptions[] = [];
		const largeNumbers: vscode.DecorationOptions[] = [];
		let match;
		while (match = regEx.exec(text)) {
			const startPos = activeEditor.document.positionAt(match.index);
			const endPos = activeEditor.document.positionAt(match.index + match[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'Number **' + match[0] + '**' };
			if (match[0].length < 3) {
				smallNumbers.push(decoration);
			} else {
				largeNumbers.push(decoration);
			}
		}
		activeEditor.setDecorations(decorationType, smallNumbers);
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
