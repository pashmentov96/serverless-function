import * as core from '@actions/core';
import { Session, cloudApi, serviceClients } from '@yandex-cloud/nodejs-sdk';
import { IActionInputs } from './types';
import { zipDirectory, parsePattern, parseEnvironmentVariables } from './utils';
import { getActionInputs } from './inputs';

async function runWithInputs(inputs: IActionInputs) {
    const {
        serverless: {
            functions_function_service: { CreateFunctionVersionRequest },
        },
    } = cloudApi;

    const session = new Session({ oauthToken: inputs.token });
    const functionService = session.client(serviceClients.FunctionServiceClient);
    const fileContents = await zipDirectory(
        inputs.sourceFolder,
        parsePattern(inputs.sourcePattern),
        parsePattern(inputs.sourceIgnore),
    );

    const memory = Number.parseFloat(inputs.memory);
    const executionTimeout = Number.parseFloat(inputs.executionTimeout);

    const request = CreateFunctionVersionRequest.fromPartial({
        functionId: inputs.functionId,
        runtime: inputs.runtime,
        entrypoint: inputs.entrypoint,
        resources: { memory: memory ? memory * 1024 * 1024 : undefined },
        serviceAccountId: inputs.serviceAccount,
        executionTimeout: { seconds: executionTimeout },
        environment: parseEnvironmentVariables(inputs.environment),
        content: fileContents,
    });

    const response = await functionService.createVersion(request);
}

async function runAction() {
    core.setCommandEcho(true);

    try {
        const inputs = getActionInputs();

        runWithInputs(inputs);
    } catch (error) {
        core.setFailed(error.message);
    }
}

runAction();