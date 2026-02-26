import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

export async function readData<T>(filename: string): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeData<T>(filename: string, data: T[]): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getItem<T>(filename: string, id: string, idKey: keyof T = 'id' as keyof T): Promise<T | null> {
  const data = await readData<T>(filename);
  return data.find(item => item[idKey] === id) || null;
}

export async function saveItem<T>(filename: string, item: T, idKey: keyof T = 'id' as keyof T): Promise<void> {
  const data = await readData<T>(filename);
  const index = data.findIndex(i => i[idKey] === item[idKey]);
  if (index >= 0) {
    data[index] = item;
  } else {
    data.push(item);
  }
  await writeData(filename, data);
}
