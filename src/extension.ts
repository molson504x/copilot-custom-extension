import * as vscode from 'vscode';
import {r2d2Handler} from './handlers/r2d2Handler';
import {C3PO_PARTICIPANT_ID, R2D2_PARTICIPANT_ID, YODA_PARTICIPANT_ID} from './constants';
import { yodaHandler } from './handlers/yodaHandler';
import { c3poHandler } from './handlers/c3poHandler';




export function activate(context: vscode.ExtensionContext) {
    const r2d2 = vscode.chat.createChatParticipant(R2D2_PARTICIPANT_ID, r2d2Handler);
    r2d2.iconPath = vscode.Uri.joinPath(context.extensionUri, 'assets', 'r2d2.jpeg');

    const yoda = vscode.chat.createChatParticipant(YODA_PARTICIPANT_ID, yodaHandler);
    yoda.iconPath = vscode.Uri.joinPath(context.extensionUri, 'assets', 'yoda.jpeg');

    const c3po = vscode.chat.createChatParticipant(C3PO_PARTICIPANT_ID, c3poHandler);
    c3po.iconPath = vscode.Uri.joinPath(context.extensionUri, 'assets', 'c3po.jpeg');
}

export function deactivate() { }


