import { SimpleGitOptions, SimpleGit, simpleGit } from 'simple-git';
import * as tl from "azure-pipelines-task-lib/task";
import binaryExtensions from 'binary-extensions';
import { getFileExtension } from './utils';

const patch = tl.getVariable('System.DefaultWorkingDirectory');
const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: patch,
  binary: 'git'
};

export const git: SimpleGit = simpleGit(gitOptions);

export async function getChangedFiles(targetBranch: string) {
  await git.addConfig('core.pager', 'cat');
  await git.addConfig('core.quotepath', 'false');
  await git.fetch();

  const diffs = await git.diff([targetBranch, '--name-only', '--diff-filter=AM']);
  const files = diffs.split('\n').filter(line => line.trim().length > 0);
  const nonBinaryFiles = files.filter(file => !binaryExtensions.includes(getFileExtension(file)));

  console.log(`Changed Files (excluding binary files) : \n ${nonBinaryFiles.join('\n')}`);

  return nonBinaryFiles;
}
