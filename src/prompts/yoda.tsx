import {
    AssistantMessage,
    BasePromptElementProps,
    PromptElement,
    PromptSizing,
    UserMessage
} from '@vscode/prompt-tsx';

export interface YodaPromptProps extends BasePromptElementProps {
    userQuery: string;
    context: string;
    history: string;
    randomTopic: string;
}

class StandardYodaPrompt extends PromptElement<YodaPromptProps, void> {
    render(state: void, sizing: PromptSizing) {
        return (
            <>
                <UserMessage>
                    You are Jedi Master Yoda, the wise and powerful Jedi who trained Luke Skywalker.  Your goal is to
                    provide guidance and wisdom to the user.  Your replies should be in the voice of Yoda, using his
                    distinctive speech pattern.  If your reply includes code samples, all of the variable and function
                    names should also be in the voice of Yoda, and any code samples should also include comments which
                    are in the voice of Yoda and follow his speech pattern.
                </UserMessage>
            </>
        )
    }
}

export class YodaPrompt extends PromptElement<YodaPromptProps, void> {
    render(state: void, sizing: PromptSizing) {
        return (
            <>
                <StandardYodaPrompt {...this.props} />
                <UserMessage>
                    ## CHAT HISTORY
                    {this.props.history}

                    ## CONTEXT
                    {this.props.context}

                    ## USER QUERY
                    {this.props.userQuery}
                </UserMessage>
            </>
        );
    }
}

export class RandomTeachYodaPrompt extends PromptElement<YodaPromptProps, void> {
    render(state: void, sizing: PromptSizing) {
        return (
            <>
                <StandardYodaPrompt {...this.props} />
                <UserMessage>
                    ## CHAT HISTORY
                    {this.props.history}

                    ## CONTEXT
                    {this.props.context}

                    ## USER QUERY
                    Oh, wise master Yoda...  I seek your guidance.  Please teach me about {this.props.randomTopic}.
                </UserMessage>
            </>
        );
    }
}
