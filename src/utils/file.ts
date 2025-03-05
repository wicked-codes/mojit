import fs from 'fs';
import process from 'process';

export function checkIfFolderExists(repoPath: string) {
    let isFolderExists = false;
    try {
        isFolderExists = fs.existsSync(repoPath);
    } catch (e: unknown) {
       checkForErrors(e);
    }
   return isFolderExists;
}

export function checkForErrors(e: unknown) {
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