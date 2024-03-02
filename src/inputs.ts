import * as core from '@actions/core';
import { IActionInputs } from "./types";

export function getActionInputs(): IActionInputs {
    const inputs: IActionInputs = {
        functionId: core.getInput('function_id', { required: true }),
        token: core.getInput('token', { required: true }),
        runtime: core.getInput('runtime', { required: true }),
        entrypoint: core.getInput('entrypoint', { required: true }),
        memory: core.getInput('memory', { required: false }),
        sourceFolder: core.getInput('source_folder', { required: false }),
        sourceIgnore: core.getInput('exclude', { required: false }),
        sourcePattern: core.getInput('source_pattern', { required: false }),
        executionTimeout: core.getInput('execution_timeout', { required: false }),
        environment: core.getInput('environment', { required: false }),
        serviceAccount: core.getInput('service_account', { required: false }),
        description: core.getInput('description', { required: false }),
    };

    return inputs;
}