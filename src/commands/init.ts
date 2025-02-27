import fs from 'fs';
import path from 'path';
import { input } from '@inquirer/prompts';

const supportedOptions: Record<string, Record<string, string>> = {
    b: {
        name: 'branch',
        type: 'string'
    },
    branch: {
        name: 'branch',
        type: 'string'
    },
    q: {
        name: 'quiet',
        type: 'boolean'
    },
    quiet: {
        name: 'quiet',
        type: 'boolean'
    }
};
export async function init(paths: Record<string, string>, options: Record<string, string | boolean | number>) {
    const { repoPath, currentFolderName } = paths;
    checkIfFolderExists(repoPath);
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
    }else{
        projectName = currentFolderName;
        projectDescription = "";
    }
    fs.mkdirSync(repoPath);
    fs.writeFileSync(path.join(repoPath, 'project.json'), JSON.stringify({ name: projectName, description: projectDescription }, null,
        2));
    (!isQuiet) ? console.log(`Mojit initialized in current directory: ${process.cwd()}`) : process.exit(0);
}

function checkIfFolderExists(repoPath: string) {
    if (fs.existsSync(repoPath)) {
        console.log('Mojit already initialized');
        process.exit(1);
    }
}