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
exports.yodaHandler = yodaHandler;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const prompt_tsx_1 = require("@vscode/prompt-tsx");
const handleError_1 = require("../handleError");
const logger_1 = require("../logger");
const constants_1 = require("../constants");
const yoda_1 = require("../prompts/yoda");
async function yodaHandler(request, context, stream, token) {
    stream.progress('Hmm, meditate on this, I must.');
    try {
        const [model] = await vscode.lm.selectChatModels(constants_1.MODEL_SELECTOR);
        if (model) {
            if (request.command === 'force-wisdom') {
                const randomTopic = getRandomTopic(context.history);
                const { messages } = await (0, prompt_tsx_1.renderPrompt)(yoda_1.RandomTeachYodaPrompt, { userQuery: randomTopic }, { modelMaxPromptTokens: model.maxInputTokens }, model);
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
                    const { messages } = await (0, prompt_tsx_1.renderPrompt)(meldPrompt, { userQuery: request.prompt }, { modelMaxPromptTokens: model.maxInputTokens }, model);
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
        }
    }
    catch (err) {
        (0, handleError_1.handleError)(logger_1.logger, err, stream);
    }
    logger_1.logger.logUsage('request', { kind: 'yoda', prompt: request.prompt });
    return { metadata: { command: request.command || 'yoda', prompt: request.prompt } };
}
function getRandomTopic(history) {
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
        return h instanceof vscode.ChatResponseTurn && h.participant === constants_1.YODA_PARTICIPANT_ID;
    });
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
function getForceMeldJedi() {
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
    let jediMeldPrompt = null;
    switch (jediMaster) {
        case "Mace Windu":
            jediMeldPrompt = yoda_1.MaceWinduMeldPrompt;
            break;
        case "Obi-Wan Kenobi":
            jediMeldPrompt = yoda_1.ObiWanMeldPrompt;
            break;
        case "Anaikin Skywalker":
            jediMeldPrompt = yoda_1.AnakinMeldPrompt;
            break;
        case "Count Dooku":
            jediMeldPrompt = yoda_1.CountDookuMeldPrompt;
            break;
        case "Qui-Gon Jinn":
            jediMeldPrompt = yoda_1.QuiGonuMeldPrompt;
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
function deactivate() { }
//# sourceMappingURL=yodaHandler.js.map