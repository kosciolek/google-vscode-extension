import * as vscode from "vscode";

const getSelectedText = (): string | undefined => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const text = editor.document.getText(editor.selection);
    if (text.length > 0) {
      return text;
    }
  }
  return undefined;
};

export const activate = async (context: vscode.ExtensionContext) => {
  const open = await import("open");

  context.subscriptions.push(
    vscode.commands.registerCommand("google-this.searchphrase", async () => {
      const selectedText = getSelectedText();
      const answer = await vscode.window.showInputBox({
        placeHolder: "Search phrase...",
        value: selectedText,
      });
      if (answer !== undefined) {
        const url = `https://www.google.com/search?q=${encodeURIComponent(
          answer
        )}`;
        console.log(`Opening ${url}`);
        open.default(url, {
          wait: false,
        });
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("google-this.searchselected", async () => {
      const selectedText = getSelectedText();
      if (selectedText !== undefined) {
        const url = `https://www.google.com/search?q=${encodeURIComponent(
          selectedText
        )}`;
        console.log(`Opening ${url}`);
        open.default(url, {
          wait: false,
        });
      } else {
        vscode.window.showInformationMessage("No text selected.");
      }
    })
  );
};
