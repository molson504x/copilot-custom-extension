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
const constants_1 = require("../constants");
async function yodaHandler(request, context, stream, token) {
    if (request.command === 'random') {
        stream.progress("Hmm, meditate on this, I must.");
        const randomTopic = getRandomTopic(context.history);
    }
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
function deactivate() { }
//# sourceMappingURL=yodaHandler.js.map