import fs from 'fs';
import path from 'path';
import crypto from 'crypto'
export function getBlob( filePath: string ):Buffer{
    const content = fs.readFileSync(filePath);
    const header = `blob ${content.length}\0`
    const blob = Buffer.concat([Buffer.from(header), content]);
    return blob;
}

export function hashBlob(blob:Buffer): string{
    return crypto.createHash('sha1').update(blob).digest('hex');
}