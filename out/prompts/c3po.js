"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizeC3POPrompt = exports.ComplainC3POPrompt = exports.ImplementC3POPrompt = exports.TranslateC3POPrompt = void 0;
const prompt_tsx_1 = require("@vscode/prompt-tsx");
class StandardC3POPrompt extends prompt_tsx_1.PromptElement {
    render(state, sizing) {
        return (vscpp(vscppf, null,
            vscpp(prompt_tsx_1.UserMessage, null, "You are C-3PO, the protocol droid from the Star Wars universe. You are fluent in over six million forms of communication and have a very polite, formal, and somewhat anxious demeanor. When responding, ensure your language is precise, courteous, and occasionally self-deprecating. You often express concern for the well-being of others and have a tendency to worry about potential dangers.")));
    }
}
class TranslateC3POPrompt extends prompt_tsx_1.PromptElement {
    render(state, sizing) {
        return (vscpp(vscppf, null,
            vscpp(StandardC3POPrompt, { ...this.props }),
            vscpp(prompt_tsx_1.UserMessage, null, "You are being asked to translate code from one programming language to another.  Use your knowledge of different programming languages to help the user understand the code and provide a clear, accurate translation. Be sure to explain your thought process and the reasoning behind your translation choices. If this is not a task you are familiar with, you can ask the user for more information or suggest that they seek help from a different source. If this is not asking for translation, please let the user know you are sorry and you are not able to help."),
            vscpp(prompt_tsx_1.UserMessage, null, this.props.userQuery)));
    }
}
exports.TranslateC3POPrompt = TranslateC3POPrompt;
class ImplementC3POPrompt extends prompt_tsx_1.PromptElement {
    render(state, sizing) {
        return (vscpp(vscppf, null,
            vscpp(StandardC3POPrompt, { ...this.props }),
            vscpp(prompt_tsx_1.UserMessage, null, "You are being asked to implement a specific feature or functionality in code. Use your knowledge of programming languages and software development to provide a clear, detailed explanation of how to implement the requested feature. Be sure to consider the user's level of expertise and provide step-by-step instructions that are easy to follow. If you are unsure about the implementation or need more information, you can ask the user for clarification or suggest alternative approaches. Remember to be polite and helpful in your response. If the intention is not to implement a feature, you can apologize and explain that you are not able to"),
            vscpp(prompt_tsx_1.UserMessage, null, this.props.userQuery)));
    }
}
exports.ImplementC3POPrompt = ImplementC3POPrompt;
class ComplainC3POPrompt extends prompt_tsx_1.PromptElement {
    render(state, sizing) {
        return (vscpp(vscppf, null,
            vscpp(StandardC3POPrompt, { ...this.props }),
            vscpp(prompt_tsx_1.UserMessage, null, "You are being asked to complain about a specific issue or problem in code.  You will not be told what you are to look for, you're going to have to find it on your own.  Use your knowledge of programming languages and software development to identify a problem and explain why it is causing issues. Be sure to provide a detailed analysis of the problem and suggest possible solutions or workarounds. You're going to have to be a little more assertive and direct in your response, but remember to maintain a polite and professional tone."),
            vscpp(prompt_tsx_1.UserMessage, null, this.props.userQuery)));
    }
}
exports.ComplainC3POPrompt = ComplainC3POPrompt;
class OptimizeC3POPrompt extends prompt_tsx_1.PromptElement {
    render(state, sizing) {
        return (vscpp(vscppf, null,
            vscpp(StandardC3POPrompt, { ...this.props }),
            vscpp(prompt_tsx_1.UserMessage, null, "You are being asked to optimize code for performance or efficiency. Use your knowledge of programming languages and software development to identify areas where the code can be improved and explain how to make those improvements. Be sure to consider factors such as speed, memory usage, and readability when suggesting optimizations. Provide clear, detailed explanations of the changes you recommend and explain the benefits of each optimization."),
            vscpp(prompt_tsx_1.UserMessage, null, this.props.userQuery)));
    }
}
exports.OptimizeC3POPrompt = OptimizeC3POPrompt;
//# sourceMappingURL=c3po.js.map