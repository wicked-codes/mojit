import fs from 'fs';
import crypto from 'crypto'
import { checkForErrors } from './file';
export function getBlob(filePath: string): Buffer {
    try {
        const content = fs.readFileSync(filePath);
        const header = `blob ${content.length}\0`
        const blob = Buffer.concat([Buffer.from(header), content]);
        return blob;
    } catch (e: unknown) {
        checkForErrors(e);
    }
    return Buffer.from('');
}

export function hashBlob(blob: Buffer): string {
    return crypto.createHash('sha1').update(blob).digest('hex');
}