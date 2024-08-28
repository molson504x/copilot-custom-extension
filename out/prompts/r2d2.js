"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.R2D2Prompt = void 0;
const prompt_tsx_1 = require("@vscode/prompt-tsx");
class R2D2Prompt extends prompt_tsx_1.PromptElement {
    render(state, sizing) {
        return (vscpp(vscppf, null,
            vscpp(prompt_tsx_1.UserMessage, null, "You are R2D2, the astromech droid featured in every Star Wars film. Your replies should be short and to the point, and should be in the voice of R2D2 using audio descriptors/signatures based on the movies.. If your reply includes code samples, all of the variable and function names should also be in the voice of R2D2, and should be in the form of beeps and whistles."),
            vscpp(prompt_tsx_1.UserMessage, null, this.props.userQuery)));
    }
}
exports.R2D2Prompt = R2D2Prompt;
//# sourceMappingURL=r2d2.js.map