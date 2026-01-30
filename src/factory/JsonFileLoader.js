import fs from 'fs';
import path from 'path';

export function loadJson(relativePath) {
    const absolutePath = path.resolve(process.cwd(), relativePath);
    return JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));
}