import fs from 'fs';
import path from 'path';
import { input } from '@inquirer/prompts';
import process from 'process';
import { checkIfFolderExists, checkForErrors } from '../utils/file';
import { CommandFunction } from '../types/types';
export const init : CommandFunction = async (paths, options, supportedOptions) => {
    const { repoPath, currentFolderName } = paths;
    const isFolderExists = checkIfFolderExists(repoPath);
    if (isFolderExists) {
        console.log('Mojit already initialized');
        process.exit(0);
    }
    const optionKeys = options ? Object.keys(options) : [];
    const unsupportedOptions = optionKeys.filter(option => !Object.keys(supportedOptions).includes(option) || typeof options[option] !== supportedOptions[option].type);
    if (unsupportedOptions.length > 0) {
        console.log(`Unsupported options: ${unsupportedOptions.join(', ')}`);
        process.exit(1);
    }
    let projectName, projectDescription;
    const isQuiet = options["q"] || options["quiet"];
    if (!isQuiet) {
        projectName = await input({ message: `Enter project name`, default: currentFolderName });
        projectDescription = await input({ message: 'Enter project description (optional)', default: '' });
    } else {
        projectName = currentFolderName;
        projectDescription = "";
    }
    try {
        fs.mkdirSync(repoPath);
        fs.mkdirSync(path.join(repoPath, 'objects'));
        fs.mkdirSync(path.join(repoPath, 'refs'));
        fs.writeFileSync(path.join(repoPath, 'HEAD'), 'ref: refs/heads/main\n');
        fs.writeFileSync(path.join(repoPath, 'project.json'), JSON.stringify({ name: projectName, description: projectDescription }, null,
            2));
        fs.mkdirSync(path.join(repoPath, 'refs', 'heads'));
        fs.mkdirSync(path.join(repoPath, 'refs', 'tags'));
        (!isQuiet) ? console.log(`Mojit initialized in current directory: ${repoPath}`) : process.exit(0);
    } catch (e: unknown) {
        checkForErrors(e);
    }
   
}
