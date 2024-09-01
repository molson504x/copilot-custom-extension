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
exports.c3poHandler = c3poHandler;
const vscode = __importStar(require("vscode"));
const handleError_1 = require("../handleError");
const logger_1 = require("../logger");
const constants_1 = require("../constants");
async function c3poHandler(request, context, stream, token) {
    stream.progress('Oh my! I do hope I can be of some assistance.');
    try {
        const [model] = await vscode.lm.selectChatModels(constants_1.MODEL_SELECTOR);
        if (model) {
        }
    }
    catch (error) {
        (0, handleError_1.handleError)(logger_1.logger, error, stream);
    }
    logger_1.logger.logUsage('request', { kind: 'c3po', prompt: request.prompt });
    return { metadata: { command: request.command || 'c3po', prompt: request.prompt } };
}
//# sourceMappingURL=c3poHandler.js.map