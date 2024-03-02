export interface IActionInputs {
    functionId: string;
    token: string;
    runtime: string;
    entrypoint: string;
    memory: string;
    sourceFolder: string;
    sourceIgnore: string;
    sourcePattern: string;
    executionTimeout: string;
    environment: string;
    serviceAccount: string;
    description: string;
}
