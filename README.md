# Yandex serverless function action

This action update Serverless function in Yandex cloud.

## Usage

1. Create serverless function in Yandex Cloud and copy function id
2. Add workflow to your repo

## Example

Place in a `.yml|.yaml`  file such as this one in your `.github/workflows` folder. [Refer to the documentation on workflow YAML syntax here.](https://help.github.com/en/articles/workflow-syntax-for-github-actions)

```yaml
name: Push and Deploy Serverless function
on: push

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: pashmentov96/serverless-action@main
      with:
        token: ${{ secrets.TOKEN }}
        function_id: 'my_function_id'
        runtime: 'python38'
        memory: '128'
        entrypoint: 'main.run'
        environment: ENV=PROD
        source_folder: 'app'
        exclude: '*.txt|*.json'
```

## Configuration

The following settings must be passed as variables as shown in the example. Sensitive information, especially `token`  should be [set as encrypted secrets](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) — otherwise, they'll be public to anyone browsing your repository.

| Key | Value | Suggested Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `token` | Token for access to yc cli. To get token visit [link](https://oauth.yandex.ru/authorize?response_type=token&client_id=1a6990aa636648e9b2ef855fa7bec2fb) | `secret` | **Yes** |
| `function_id` | The ID of function in Yandex Cloud | `env` | **Yes** |
| `runtime` | Runtime for function in Yandex Cloud. To get the list of allowed args visit [link](https://cloud.yandex.com/en-ru/docs/functions/concepts/runtime/#runtimes) | `env` | **Yes** |
| `entrypoint` | Entry point of function | `env` | **Yes** |
| `description` | Description for version of function | `env` | No |
| `environment` | Comma-separated list with environment variables | `env` | No |
| `memory` | Memory limit in `megabytes` for function in Yandex Cloud. Default value is `128`| `env` | No |
| `execution_timeout` | Execution timeout in seconds for function in Yandex Cloud. Default value is `5` | `env` | No |
| `service_account` | Service account id | `secret` | No |
| `source_folder` | The local directory you wish to upload. For example, `./public`. Defaults to the root of your repository (`.`) if not provided | `env` | No |
| `exclude` | Explicitly exclude the specified files. Defaults empty if not provided | `env` | No |
| `source_pattern` | Pattern for includes files. Defaults empty if not provided | `env` | No |


# Scenarios

- [Yandex serverless function action](#yandex-serverless-function-action)
  - [Usage](#usage)
  - [Example](#example)
  - [Configuration](#configuration)
- [Scenarios](#scenarios)
  - [Zip and deploy folder](#zip-and-deploy-folder)
  - [Exclude pattern from archive](#exclude-pattern-from-archive)

## Zip and deploy folder

```yaml
- uses: pashmentov96/serverless-action@main
  with:
    token: ${{ secrets.TOKEN }}
    function_id: 'my_function_id'
    runtime: 'python38'
    memory: '128'
    entrypoint: 'main.run'
    environment: ENV=PROD
    source: 'app'
```

## Exclude pattern from archive

```yaml
- uses: pashmentov96/serverless-action@main
  with:
    token: ${{ secrets.TOKEN }}
    function_id: 'my_function_id'
    runtime: 'python38'
    memory: '128'
    entrypoint: 'main.handler'
    environment: ENV=PROD
    source: 'app'
    exclude: '*.txt'
```
