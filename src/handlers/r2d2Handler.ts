import * as vscode from "vscode";
import {renderPrompt} from '@vscode/prompt-tsx';
import {handleError} from "../handleError";
import {logger} from "../logger";
import { MODEL_SELECTOR } from "../constants";
import { R2D2Prompt } from "../prompts/r2d2";

interface IChatResult extends vscode.ChatResult {
    metadata: {
        command: string;
        prompt: string;
    }
}

export async function r2d2Handler(request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<IChatResult> {
    stream.progress('beep boop beep beep boop');
    try {
        const [model] = await vscode.lm.selectChatModels(MODEL_SELECTOR);
        if (model) {
            const {messages} = await renderPrompt(
                R2D2Prompt,
                {userQuery: request.prompt},
                {modelMaxPromptTokens: model.maxInputTokens},
                model);
            
            const chatResponse = await model.sendRequest(messages, {}, token);
            for await (const fragment of chatResponse.text) {
                stream.markdown(fragment);
            }
        }
    }
    catch (err) {
        handleError(logger, err, stream);
    }

    logger.logUsage('request', {kind: 'r2d2', prompt: request.prompt});
    return {metadata: {command: 'r2d2', prompt: request.prompt}};
};