#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import yargs from 'yargs';
import {input} from '@inquirer/prompts'


async function parseArgs(){
    return await yargs(process.argv.slice(2)).parse();
}

const commandFunctionMap : Record<string, (args:string[]|unknown)=>void> = {
    init: init
}

async function execute(){
    const argv = await parseArgs();
    const args = argv._;
    if(args.length === 0){
        console.log('Please provide a command');
        process.exit(1);
    }
    const command = args[0];
    const commandArgs = args.slice(1);
    if(commandFunctionMap[command]){
        commandFunctionMap[command]([...commandArgs]);
    } else {
        console.log(`Command not found: ${command}`);
        process.exit(1);
    }
}

async function init (){
    const directoryFilePath = process.cwd();
    const repoPath = path.join(directoryFilePath, '.mojit');
    const currentFolderName = path.basename(directoryFilePath);
    if(fs.existsSync(repoPath)){
        console.log('Mojit already initialized');
        process.exit(1);
    }
    const projectName = await input({message: `Enter project name (${currentFolderName})`});
    const projectDescription = await input({message: 'Enter project description (optional)'});
    fs.mkdirSync(repoPath);
    fs.writeFileSync(path.join(repoPath, 'project.json'), JSON.stringify({name: projectName??currentFolderName, description: projectDescription??""}, null,
    2));
    console.log(`Mojit initialized in current directory: ${process.cwd()}`);
}

execute();
