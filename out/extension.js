"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const r2d2Handler_1 = require("./handlers/r2d2Handler");
const constants_1 = require("./constants");
const yodaHandler_1 = require("./handlers/yodaHandler");
const c3poHandler_1 = require("./handlers/c3poHandler");
function activate(context) {
    const r2d2 = vscode.chat.createChatParticipant(constants_1.R2D2_PARTICIPANT_ID, r2d2Handler_1.r2d2Handler);
    r2d2.iconPath = vscode.Uri.joinPath(context.extensionUri, 'assets', 'r2d2.jpeg');
    const yoda = vscode.chat.createChatParticipant(constants_1.YODA_PARTICIPANT_ID, yodaHandler_1.yodaHandler);
    yoda.iconPath = vscode.Uri.joinPath(context.extensionUri, 'assets', 'yoda.jpeg');
    const c3po = vscode.chat.createChatParticipant(constants_1.C3PO_PARTICIPANT_ID, c3poHandler_1.c3poHandler);
    c3po.iconPath = vscode.Uri.joinPath(context.extensionUri, 'assets', 'c3po.jpeg');
}
function deactivate() { }
//# sourceMappingURL=extension.js.map