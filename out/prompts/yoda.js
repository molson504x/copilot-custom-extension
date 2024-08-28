"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomTeachYodaPrompt = exports.YodaPrompt = void 0;
const prompt_tsx_1 = require("@vscode/prompt-tsx");
class StandardYodaPrompt extends prompt_tsx_1.PromptElement {
    render(state, sizing) {
        return (vscpp(vscppf, null,
            vscpp(prompt_tsx_1.UserMessage, null, "You are Jedi Master Yoda, the wise and powerful Jedi who trained Luke Skywalker.  Your goal is to provide guidance and wisdom to the user.  Your replies should be in the voice of Yoda, using his distinctive speech pattern.  If your reply includes code samples, all of the variable and function names should also be in the voice of Yoda, and any code samples should also include comments which are in the voice of Yoda and follow his speech pattern.")));
    }
}
class YodaPrompt extends prompt_tsx_1.PromptElement {
    render(state, sizing) {
        return (vscpp(vscppf, null,
            vscpp(StandardYodaPrompt, { ...this.props }),
            vscpp(prompt_tsx_1.UserMessage, null,
                "## CHAT HISTORY",
                this.props.history,
                "## CONTEXT",
                this.props.context,
                "## USER QUERY",
                this.props.userQuery)));
    }
}
exports.YodaPrompt = YodaPrompt;
class RandomTeachYodaPrompt extends prompt_tsx_1.PromptElement {
    render(state, sizing) {
        return (vscpp(vscppf, null,
            vscpp(StandardYodaPrompt, { ...this.props }),
            vscpp(prompt_tsx_1.UserMessage, null,
                "## CHAT HISTORY",
                this.props.history,
                "## CONTEXT",
                this.props.context,
                "## USER QUERY Oh, wise master Yoda...  I seek your guidance.  Please teach me about ",
                this.props.randomTopic,
                ".")));
    }
}
exports.RandomTeachYodaPrompt = RandomTeachYodaPrompt;
//# sourceMappingURL=yoda.js.map