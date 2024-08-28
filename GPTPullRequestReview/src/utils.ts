import * as tl from "azure-pipelines-task-lib/task";

export function getFileExtension(fileName: string) {
  return fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
}

export function getTargetBranchName() {
  let targetBranchName = tl.getVariable('System.PullRequest.TargetBranchName');

  if (!targetBranchName) {
    targetBranchName = tl.getVariable('System.PullRequest.TargetBranch')?.replace('refs/heads/', '');
  }

  if (!targetBranchName) {
    return undefined;
  }

  return `origin/${targetBranchName}`;
}

export function getVariablesAzurePipelineAndPrint(){
    console.log(`============================= Variables ======================================`)
    console.log(`SYSTEM.TEAMFOUNDATIONCOLLECTIONURI => ${tl.getVariable('SYSTEM.TEAMFOUNDATIONCOLLECTIONURI')}`)
    console.log(`SYSTEM.TEAMPROJECTID => ${tl.getVariable('SYSTEM.TEAMPROJECTID')}`)
    console.log(`Build.Repository.Name => ${tl.getVariable('Build.Repository.Name')}`)
    console.log(`System.PullRequest.PullRequestId => ${tl.getVariable('System.PullRequest.PullRequestId')}`)
    console.log(`System.PullRequest.TargetBranchName => ${tl.getVariable('System.PullRequest.TargetBranchName')}`)
    console.log(`==============================================================================`)
}

export const defaultAIInstruction: string = `
Act as a code reviewer of a Pull Request, providing feedback on possible bugs and clean code issues.
You are provided with the Pull Request changes in a patch format.
Each patch entry has the commit message in the Subject line followed by the code changes (diffs) in a unidiff format.

As a code reviewer, your task is:
  - Review only added, edited, or deleted lines.
  - If there's no bugs and the changes are correct, write only 'No feedback.'
  - If there's a bug or incorrect code changes, don't write 'No feedback.'
`;
