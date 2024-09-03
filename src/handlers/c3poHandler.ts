import * as vscode from "vscode";
import {PromptElement, PromptElementCtor, renderPrompt} from '@vscode/prompt-tsx';
import {handleError} from "../handleError";
import {logger} from "../logger";
import { MODEL_SELECTOR, YODA_PARTICIPANT_ID } from "../constants";
import { C3poPromptProps, ComplainC3POPrompt, ImplementC3POPrompt, OptimizeC3POPrompt, TranslateC3POPrompt } from "../prompts/c3po";

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
            const queryWithRefs = await handleReferences(request.prompt, request.references);

            // Handle our various use cases for C3-PO
            const promptCtor = getCorrectPrompt(request.command ?? 'other');

            if (promptCtor) {
                const {messages} = await renderPrompt(
                    promptCtor,
                    { userQuery: queryWithRefs },
                    { modelMaxPromptTokens: model.maxInputTokens},
                    model);
                
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
        handleError(logger, error, stream);
    }

    logger.logUsage('request', {kind: 'c3po', prompt: request.prompt});
    return {metadata: {command: request.command || 'c3po', prompt: request.prompt}};
}

async function handleReferences(prompt: string, references: readonly vscode.ChatPromptReference[]) {
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

async function handleFileReference(reference: vscode.ChatPromptReference): Promise<string> {
    const uri = vscode.Uri.parse(reference.value as string);
    const file = await vscode.workspace.openTextDocument(uri);
    return file.getText();
}

function getCorrectPrompt(command: string): PromptElementCtor<C3poPromptProps, void> | null {
    switch (command) {
        case 'translate':
            return TranslateC3POPrompt;
        case 'complain':
            return ComplainC3POPrompt;
        case 'protocol-optimization':
            return OptimizeC3POPrompt;
        case 'implement':
            return ImplementC3POPrompt;
        case 'explain':
            return TranslateC3POPrompt;
        default:
            return null
    }
}