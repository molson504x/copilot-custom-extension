import * as vscode from "vscode";
import {PromptElement, PromptElementCtor, renderPrompt} from '@vscode/prompt-tsx';
import {handleError} from "../handleError";
import {logger} from "../logger";
import { MODEL_SELECTOR, YODA_PARTICIPANT_ID } from "../constants";
import { AnakinMeldPrompt, MaceWinduMeldPrompt, ObiWanMeldPrompt, QuiGonuMeldPrompt, CountDookuMeldPrompt, RandomTeachYodaPrompt, YodaPromptProps, YodaPrompt} from "../prompts/yoda";

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
        if (model) {
            if (request.command === 'force-wisdom') {
                const randomTopic = getRandomTopic(context.history);

                const {messages} = await renderPrompt(
                    RandomTeachYodaPrompt,
                    { userQuery: randomTopic, chatHistory: context.history },
                    { modelMaxPromptTokens: model.maxInputTokens},
                    model);
                
                const chatResponse = await model.sendRequest(messages, {}, token);
                for await (const fragment of chatResponse.text) {
                    stream.markdown(fragment);
                }
            }
            else if (request.command === 'force-meld') {
                stream.progress('A moment, you must wait. The Force-meld, attempt I will.');

                // Pause execution for a few seconds to make it seem like Yoda is thinking...
                await new Promise(resolve => setTimeout(resolve, 2000));

                const [jediMaster, meldPrompt] = getForceMeldJedi();
                stream.progress(`Sensing ${jediMaster}'s presence, I am. Eager to share wisdom, ${jediMaster} is...`);

                // Pause execution for a few seconds to make it seem like Yoda is thinking...
                await new Promise(resolve => setTimeout(resolve, 2000));

                if (meldPrompt) {
                    const {messages} = await renderPrompt(
                        meldPrompt,
                        { userQuery: request.prompt, chatHistory: context.history },
                        { modelMaxPromptTokens: model.maxInputTokens },
                        model
                    );

                    const chatResponse = await model.sendRequest(messages, {}, token);
                    stream.markdown(`*${jediMaster} speaks. Listen, you must...*\n\n---\n\n`);
                    for await (const fragment of chatResponse.text) {
                        stream.markdown(fragment);
                    }
                    stream.markdown(`\n\n---\n\n*${jediMaster} has spoken. Reflect on his words, you must...*`);
                }
                else {
                    // If we don't have a prompt for the jedi master, indicate there was a problem and that he needs rest...
                    stream.markdown('Mmm, a problem there is. Rest, I must. Try again later, you should.');
                }
            }
            else {
                const {messages} = await renderPrompt(
                    YodaPrompt,
                    { userQuery: request.prompt, chatHistory: context.history },
                    { modelMaxPromptTokens: model.maxInputTokens},
                    model
                );

                const chatResponse = await model.sendRequest(messages, {}, token);
                for await (const fragment of chatResponse.text) {
                    stream.markdown(fragment);
                }
            }
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

function getForceMeldJedi() : [string, PromptElementCtor<YodaPromptProps, void> | null] {
    const jedi = [
        "Mace Windu",
        "Obi-Wan Kenobi",
        "Anaikin Skywalker",
        "Count Dooku",
        "Qui-Gon Jinn",
        "Emporer Palpatine",
    ];

    //Get random jedi master from the list
    const jediMaster = jedi[Math.floor(Math.random() * jedi.length)];

    // Get the prompt for the jedi master
    let jediMeldPrompt : PromptElementCtor<YodaPromptProps, void> | null = null;
    switch (jediMaster) {
        case "Mace Windu":
            jediMeldPrompt = MaceWinduMeldPrompt;
            break;
        case "Obi-Wan Kenobi":
            jediMeldPrompt = ObiWanMeldPrompt;
            break;
        case "Anaikin Skywalker":
            jediMeldPrompt = AnakinMeldPrompt;
            break;
        case "Count Dooku":
            jediMeldPrompt = CountDookuMeldPrompt;
            break;
        case "Qui-Gon Jinn":
            jediMeldPrompt = QuiGonuMeldPrompt;
            break;
        case "Emporer Palpatine":
            jediMeldPrompt = null;
            break;
        default:
            jediMeldPrompt = null;
            break;
    }

    // Return the jedi master and the prompt type
    return [jediMaster, jediMeldPrompt];
}

export function deactivate() { }