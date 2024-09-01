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
exports.r2d2Handler = r2d2Handler;
const vscode = __importStar(require("vscode"));
const prompt_tsx_1 = require("@vscode/prompt-tsx");
const handleError_1 = require("../handleError");
const logger_1 = require("../logger");
const constants_1 = require("../constants");
const r2d2_1 = require("../prompts/r2d2");
async function r2d2Handler(request, context, stream, token) {
    stream.progress('beep boop beep beep boop');
    try {
        const [model] = await vscode.lm.selectChatModels(constants_1.MODEL_SELECTOR);
        if (model) {
            const { messages } = await (0, prompt_tsx_1.renderPrompt)(r2d2_1.R2D2Prompt, { userQuery: request.prompt }, { modelMaxPromptTokens: model.maxInputTokens }, model);
            const chatResponse = await model.sendRequest(messages, {}, token);
            for await (const fragment of chatResponse.text) {
                stream.markdown(fragment);
            }
        }
    }
    catch (err) {
        (0, handleError_1.handleError)(logger_1.logger, err, stream);
    }
    logger_1.logger.logUsage('request', { kind: 'r2d2', prompt: request.prompt });
    return { metadata: { command: 'r2d2', prompt: request.prompt } };
}
;
//# sourceMappingURL=r2d2Handler.js.map