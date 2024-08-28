import * as vscode from "vscode";
import {renderPrompt} from '@vscode/prompt-tsx';
import {handleError} from "../handleError";
import {logger} from "../logger";
import { MODEL_SELECTOR, YODA_PARTICIPANT_ID } from "../constants";
import { RandomTeachYodaPrompt, YodaPrompt } from "../prompts/yoda";

interface IChatResult extends vscode.ChatResult {
    metadata: {
        command: string;
        prompt: string;
    }
}

export async function yodaHandler(request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<IChatResult> {
    stream.progress('Hmm, meditate on this, I must.');
    try {
        const [model] = await vscode.lm.selectChatModels(MODEL_SELECTOR);
        if (request.command === 'random') {
            const randomTopic = getRandomTopic(context.history);

            const {messages} = await renderPrompt(
                RandomTeachYodaPrompt,
                { history: context.history, context: request.references, randomTopic: randomTopic },
                { modelMaxPromptTokens: model.maxInputTokens}
            )
        }
    }
    catch (err) {
        handleError(logger, err, stream);
    }

    logger.logUsage('request', {kind: 'yoda', prompt: request.prompt});
    return {metadata: {command: request.command || 'yoda', prompt: request.prompt}};
}

function getRandomTopic(history: ReadonlyArray<vscode.ChatRequestTurn | vscode.ChatResponseTurn>) : string {
    const topics = [
        "Linked List",
        "Recursion",
        "Dependency Injection",
        "Cyclomatic Complexity",
        "Unit Testing",
        "Concurrency",
        "Repository Pattern"
    ];

    //Filter the chat history to only get responses from Yoda
    const previousResponses = history.filter(h => {
        return h instanceof vscode.ChatResponseTurn && h.participant === YODA_PARTICIPANT_ID;
    }) as vscode.ChatResponseTurn[];

    //Filter the topics to only get topics that Yoda hasn't taught yet
    const remainingTopics = topics.filter(topic => {
        return !previousResponses.some(response => {
            return response.response.some(r => {
                return r instanceof vscode.ChatResponseMarkdownPart && r.value.value.includes(topic);
            });
        });
    });

    return remainingTopics[Math.floor(Math.random() * remainingTopics.length)] || "Pass on what you have learned, you must. A true master, you have become.";
}

export function deactivate() { }