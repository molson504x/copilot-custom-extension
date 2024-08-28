import {renderPrompt} from '@vscode/prompt-tsx';
import * as vscode from 'vscode';
import {r2d2Handler} from './handlers/r2d2Handler';
import {R2D2_PARTICIPANT_ID} from './constants';
// import {YodaPrompt} from './yoda';
// import {DarthVaderPrompt} from './darth-vader';
// import {LukeSkywalkerPrompt} from './luke-skywalker';



export function activate(context: vscode.ExtensionContext) {
    const r2d2 = vscode.chat.createChatParticipant(R2D2_PARTICIPANT_ID, r2d2Handler);
    r2d2.iconPath = vscode.Uri.joinPath(context.extensionUri, 'assets', 'r2d2.jpeg');
}

export function deactivate() { }


