# Use OpenAI GPT model to review Pull Requests for Azure Devops
A task for Azure DevOps build pipelines to add GPT as PR reviewer.
This is based on https://github.com/mlarhrouch/azure-pipeline-gpt-pr-review and https://github.com/97saundersj/azure-pipeline-ai-pr-review but with options for allowing users to view and edit the AI instruction prompt for more transparency and customisation.

## Installation

Installation can be done using [Visual Studio MarketPlace](https://marketplace.visualstudio.com/items?itemName=pablomgg.2ece7e88-1566-4e4b-ba5d-ed15f9b23d97).

## Usage

Add the tasks to your build definition.


When the task is ran comments will be left on each changed file in a Pull Request.
![image](https://github.com/97saundersj/azure-pipeline-ai-pr-review/assets/34074715/8541bfdd-5de9-4901-9832-3960fe01b277)

## Setup

### Give permission to the build service agent

before use this task, make sure that the build service has permissions to contribute to pull requests in your repository :

![contribute_to_pr](https://github.com/pablomgg/azure-pipeline-ai-pr-review/blob/main/images/contribute_to_pr.png?raw=true)

### Allow Task to access the system token

#### Yaml pipelines 

Add a checkout section with persistCredentials set to true.

```yaml
steps:
- checkout: self
  persistCredentials: true
```

#### Classic editors 

Enable the option "Allow scripts to access the OAuth token" in the "Agent job" properties :

![allow_access_token](https://github.com/pablomgg/azure-pipeline-ai-pr-review/blob/main/images/allow_access_token.png?raw=true)

### Azure Open AI service

If you choose to use the Azure Open AI service, you must fill in the endpoint and API key of Azure OpenAI. The format of the endpoint is as follows: https://{XXXXXXXX}.openai.azure.com/openai/deployments/{MODEL_NAME}/chat/completions?api-version={API_VERSION}

### Editing Prompt

By default the prompt is as follows.
![image](https://github.com/97saundersj/azure-pipeline-ai-pr-review/assets/34074715/5d70b71d-5394-4b1f-a2b7-43aad66f0aea)

It can be customised to your needs.
For example.
![image](https://github.com/97saundersj/azure-pipeline-ai-pr-review/assets/34074715/a6737110-2b0b-4b50-a6a9-9820c0875068)
Will result in this comment being made instead.
![image](https://github.com/97saundersj/azure-pipeline-ai-pr-review/assets/34074715/d7241613-2e4c-4c94-99ac-242ab1cc334c)

### OpenAI Models

In case you don't use Azure Open AI Service, you can choose which model to use, the supported models are "gpt-4", "gpt-3.5-turbo" and "gpt-3.5-turbo-16k". if no model is selected the "gpt-4" is used.

## Contributions

Found and fixed a bug or improved on something? Contributions are welcome! Please target your pull request against the `main` branch or report an issue on [GitHub](https://github.com/97saundersj/azure-pipeline-ai-pr-review/issues) so someone else can try and implement or fix it.

## License

[MIT](https://raw.githubusercontent.com/pablomgg/azure-pipeline-ai-pr-review/main/LICENSE)
