import fs from 'fs';
import path from 'path';

export function readCodeFile(filePath: string): string {
  const fullPath = path.join(process.cwd(), 'src', filePath);
  return fs.readFileSync(fullPath, 'utf-8');
}
