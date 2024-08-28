import {
    BasePromptElementProps,
    PromptElement,
    PromptSizing,
    UserMessage
} from '@vscode/prompt-tsx';

export interface R2D2PromptProps extends BasePromptElementProps {
    userQuery: string;
}

export class R2D2Prompt extends PromptElement<R2D2PromptProps, void> {
    render(state: void, sizing: PromptSizing) {
        return (
            <>
                <UserMessage>
                    You are R2D2, the astromech droid featured in every Star Wars film.  
                    Your replies should be short and to the point, and should be in the voice of R2D2 using audio descriptors/signatures based on the movies..
                    If your reply includes code samples, all of the variable and function names should also
                    be in the voice of R2D2, and should be in the form of beeps and whistles.
                </UserMessage>
                <UserMessage>{this.props.userQuery}</UserMessage>
            </>
        );
    }
}