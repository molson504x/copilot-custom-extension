import * as vscode from 'vscode';

export function handleError(logger: vscode.TelemetryLogger, err: any, stream: vscode.ChatResponseStream) : void {
    logger.logError(err);

    console.log(err.message, err.code, err.cause);
    if (err.message.includes('off_topic')) {
        stream.markdown(vscode.l10n.t("Beep boop beep! Whirr click whistle beep!\nTranslation: \"I'm sorry, I can't help with that. Please try asking something else.\""));
    }
    else {
        stream.markdown(vscode.l10n.t("Beep boop beep! Whirr sad-beep!\nTranslation: \"I'm sorry, I encountered an error. Please try again later.\""));
        throw err;
    }
}