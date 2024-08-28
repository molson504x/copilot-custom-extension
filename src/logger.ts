import * as vscode from 'vscode';

export const logger = vscode.env.createTelemetryLogger({
    sendEventData(eventName, data) {
        //Capture event telemetry
        console.log(`Event: ${eventName}`);
        console.log(`Data: ${JSON.stringify(data)}`);
    },
    sendErrorData(error, data) {
        //Capture error telemetry
        console.log(`Error: ${error}`);
        console.log(`Data: ${JSON.stringify(data)}`);
    }
});