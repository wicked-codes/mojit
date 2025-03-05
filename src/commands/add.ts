import fs from 'fs';
import path from 'path';
import { input } from '@inquirer/prompts';
import process from 'process';
import { checkIfFolderExists, checkForErrors } from '../utils/file';
import { CommandFunction } from '../types/types';
export const add: CommandFunction = async (paths, options, supportedOptions) => {
    const { repoPath, currentFolderName } = paths;
    const isFolderExists = checkIfFolderExists(repoPath);
    if (!isFolderExists) {
        console.log('Mojit not initialized! Please run `mojit init` to initialize');
        process.exit(1);
    }
    console.log('Add command', options);
    const optionKeys = options ? Object.keys(options) : [];
    const unsupportedOptions = optionKeys.filter(option => !Object.keys(supportedOptions).includes(option) || typeof options[option] !== supportedOptions[option].type);
    if (unsupportedOptions.length > 0) {
        console.log(`Unsupported options: ${unsupportedOptions.join(', ')}`);
        process.exit(1);
    }
    const isQuiet = options["q"] || options["quiet"];
    if (!isQuiet) {
        console.log('Please provide a file to add');
        process.exit(1);
    }

}