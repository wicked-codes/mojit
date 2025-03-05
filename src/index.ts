#!/usr/bin/env node
import * as path from 'path';
import * as process from 'process';
import yargs from 'yargs';
import { commandFunctionMap } from './commandChain';
import { supportedOptions } from './config/supportedOptions.config';

async function parseArgs() {
    const argv = await yargs(process.argv.slice(2)).parse();
    const args = argv._;
    if (args.length === 0) {
        console.log('Please provide a command');
        process.exit(1);
    }
    const command = args[0];

    const commandOptions = Object.fromEntries(Object.entries(argv).filter(([key, value]) => {
        return (key !== '_' && key !== '$0') && value;
    }));
    console.log(commandOptions)
    return { command, commandOptions };
}

async function getRequiredPaths() {
    const directoryFilePath = process.cwd();
    const repoPath = path.join(directoryFilePath, '.mojit');
    const currentFolderName = path.basename(directoryFilePath);
    return { directoryFilePath, repoPath, currentFolderName };
}

async function execute() {
    const { command, commandOptions } = await parseArgs();
    const requiredPaths = await getRequiredPaths();
    if (commandFunctionMap[command]) {
        commandFunctionMap[command](requiredPaths, commandOptions as Record<string, string | boolean | number>, supportedOptions[command]);
    } else {
        console.log(`Command not found: ${command}`);
        process.exit(1);
    }
}


execute();
