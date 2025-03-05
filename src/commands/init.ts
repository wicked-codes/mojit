import fs from 'fs';
import path from 'path';
import { input } from '@inquirer/prompts';
import process from 'process';

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
        if (e && typeof e === 'object' && 'code' in e && e["code"] === 'EEXIST') {
            console.log('Mojit already initialized');
            process.exit(1);
        }
        if (e && typeof e === 'object' && 'code' in e && e["code"] === 'EACCES') {
            console.log('Permission denied');
            process.exit(1);
        }
        if (e && typeof e === 'object' && 'code' in e && e["code"] === 'EPERM') {
            console.log('Operation not permitted');
            process.exit(1);
        }
        if (e && typeof e === 'object' && 'code' in e && e["code"] === 'ENOENT') {
            console.log('No such file or directory');
            process.exit(1);
        }
        console.log(e);
        console.log("Please raise this an issue with the configuration, if you think this is a bug");
        process.exit(1);
    }
   
}

function checkIfFolderExists(repoPath: string) {
    let isFolderExists = false;
    try {
        isFolderExists = fs.existsSync(repoPath);
    } catch (e: unknown) {
        if (e && typeof e === 'object' && 'code' in e && e["code"] === 'EACCES') {
            console.log('Permission denied');
            process.exit(1);
        }
        if (e && typeof e === 'object' && 'code' in e && e["code"] === 'EPERM') {
            console.log('Operation not permitted');
            process.exit(1);
        }
        if (e && typeof e === 'object' && 'code' in e && e["code"] === 'ENOENT') {
            console.log('No such file or directory');
            process.exit(1);
        }
        console.log(e);
        process.exit(1);
    } finally {
        if (isFolderExists) {
            console.log('Mojit already initialized');
            process.exit(1);
        }
    }

}