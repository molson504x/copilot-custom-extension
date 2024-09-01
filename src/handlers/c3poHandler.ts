import * as vscode from "vscode";
import {PromptElement, PromptElementCtor, renderPrompt} from '@vscode/prompt-tsx';
import {handleError} from "../handleError";
import {logger} from "../logger";
import { MODEL_SELECTOR, YODA_PARTICIPANT_ID } from "../constants";

interface IChatResult extends vscode.ChatResult {
    metadata: {
        command: string;
        prompt: string;
    }
}

export async function c3poHandler(request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<IChatResult> {
    stream.progress('Oh my! I do hope I can be of some assistance.');
    try {
        const [model] = await vscode.lm.selectChatModels(MODEL_SELECTOR);
        if (model) {

        }
    }
    catch (error) {
        handleError(logger, error, stream);
    }

    logger.logUsage('request', {kind: 'c3po', prompt: request.prompt});
    return {metadata: {command: request.command || 'c3po', prompt: request.prompt}};
}