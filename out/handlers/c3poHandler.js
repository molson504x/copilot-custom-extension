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
const prompt_tsx_1 = require("@vscode/prompt-tsx");
const handleError_1 = require("../handleError");
const logger_1 = require("../logger");
const constants_1 = require("../constants");
const c3po_1 = require("../prompts/c3po");
async function c3poHandler(request, context, stream, token) {
    stream.progress('Oh my! I do hope I can be of some assistance.');
    try {
        const [model] = await vscode.lm.selectChatModels(constants_1.MODEL_SELECTOR);
        if (model) {
            const queryWithRefs = await handleReferences(request.prompt, request.references);
            // Handle our various use cases for C3-PO
            const promptCtor = getCorrectPrompt(request.command ?? 'other');
            if (promptCtor) {
                const { messages } = await (0, prompt_tsx_1.renderPrompt)(promptCtor, { userQuery: queryWithRefs }, { modelMaxPromptTokens: model.maxInputTokens }, model);
                const chatResponse = await model.sendRequest(messages, {}, token);
                for await (const fragment of chatResponse.text) {
                    stream.markdown(fragment);
                }
            }
            else {
                stream.markdown("I'm terribly sorry, but I seem to be a bit confused by your request. Could you please provide me with more information?");
            }
        }
    }
    catch (error) {
        (0, handleError_1.handleError)(logger_1.logger, error, stream);
    }
    logger_1.logger.logUsage('request', { kind: 'c3po', prompt: request.prompt });
    return { metadata: { command: request.command || 'c3po', prompt: request.prompt } };
}
async function handleReferences(prompt, references) {
    if (!references) {
        return prompt;
    }
    for (const reference of references) {
        switch (reference.id) {
            case 'vscode.file':
                const fileContents = await handleFileReference(reference);
                prompt = `${prompt}
                    
                ## FILE REFERENCE: ${reference.value}
                
                ${fileContents}
                
                ## END FILE REFERENCE
                
                `;
                break;
            case 'copilot.selection':
                prompt = `${prompt}

                ## SELECTION REFERENCE
                ${reference.value}

                ## END SELECTION REFERENCE
                
                `;
                break;
        }
    }
    return prompt;
}
async function handleFileReference(reference) {
    const uri = vscode.Uri.parse(reference.value);
    const file = await vscode.workspace.openTextDocument(uri);
    return file.getText();
}
function getCorrectPrompt(command) {
    switch (command) {
        case 'translate':
            return c3po_1.TranslateC3POPrompt;
        case 'complain':
            return c3po_1.ComplainC3POPrompt;
        case 'protocol-optimization':
            return c3po_1.OptimizeC3POPrompt;
        case 'implement':
            return c3po_1.ImplementC3POPrompt;
        default:
            return null;
    }
}
//# sourceMappingURL=c3poHandler.js.map