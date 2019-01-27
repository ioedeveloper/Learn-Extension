// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "sample-typescript-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let helloCommand = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
		vscode.window.showErrorMessage('My little error');
		let options: vscode.InputBoxOptions = {
			value: "Enter a message",
			prompt: "Just a short message"
			};
		let msg = vscode.window.showInputBox(options);
		if(typeof(msg) !== "undefined"){
			vscode.window.showWarningMessage("success");
		}

		vscode.window.showWorkspaceFolderPick();
	});

	let smileCommand = vscode.commands.registerTextEditorCommand("extension.smile", (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit)=>{
		vscode.commands.executeCommand('extension.helloWorld');
		console.log('Smile command Called');
		let snippet = new vscode.SnippetString('My little snippet');
		textEditor.insertSnippet(snippet);
		let start: vscode.Position = new vscode.Position(0, 0);
		let end: vscode.Position = new vscode.Position(0, 5);
		let range: vscode.Range = new vscode.Range(start, end);
		textEditor.edit((editBuilder: vscode.TextEditorEdit) => {
			console.log('Line Numbers: ', textEditor.options.lineNumbers);
			editBuilder.delete(range);
			textEditor.revealRange(range);
		});
		console.log('Options: ', textEditor.options);
		console.log('Line Count: ',textEditor.document.lineCount);
		console.log('Selection: ', textEditor.selection);
		console.log('Selections: ', textEditor.selections);
		console.log('View Column: ', textEditor.viewColumn);
		console.log('Visible Ranges', textEditor.visibleRanges);
		/** Hide Texteditor */
		textEditor.hide();
		/** Show Texteditor */
		textEditor.show();

		vscode.window.onDidChangeActiveTextEditor(listener => (e: vscode.TextEditor | undefined) =>{
			if(typeof(e) !== undefined){
				console.log('Text Editor Changed');
			}
		});

	});

	context.subscriptions.push(helloCommand);
	context.subscriptions.push(smileCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
