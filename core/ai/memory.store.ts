import fs from 'fs';
import path from 'path';
import { embedText } from './embedder';

const memoryBasePath = path.resolve('core/data/vector-store');

interface MemoryItem {
  id: string;
  vector: number[];
  content: string;
  metadata: {
    namespace: string;
    source: string;
    query?: string;
    url?: string;
    timestamp: number;
  };
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((acc, val, i) => acc + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
  return dot / (magA * magB);
}

function getNamespacePath(namespace: string): string {
  return path.join(memoryBasePath, `${namespace}.json`);
}

function chunkText(text: string, chunkSize = 300): string[] {
  const sentences = text.split(/(?<=[.?!])\s+/);
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    if ((current + sentence).length > chunkSize) {
      chunks.push(current.trim());
      current = '';
    }
    current += sentence + ' ';
  }

  if (current.trim()) chunks.push(current.trim());

  return chunks;
}

export const memoryStore = {
  async add(content: string, metadata: Omit<MemoryItem['metadata'], 'timestamp'>) {
    const namespace = metadata.namespace || 'shared';
    const memoryPath = getNamespacePath(namespace);
    fs.mkdirSync(memoryBasePath, { recursive: true });

    const existingData: MemoryItem[] = fs.existsSync(memoryPath)
      ? JSON.parse(fs.readFileSync(memoryPath, 'utf-8'))
      : [];

    const chunks = chunkText(content);

    for (const chunk of chunks) {
      const vector = await embedText(chunk);
      const newItem: MemoryItem = {
        id: Date.now().toString() + '-' + Math.random().toString(36).substring(2),
        vector,
        content: chunk,
        metadata: {
          ...metadata,
          timestamp: Date.now(),
        },
      };

      existingData.push(newItem);
    }

    fs.writeFileSync(memoryPath, JSON.stringify(existingData, null, 2));
  },

  async search(query: string, namespace = 'shared', topK = 3): Promise<MemoryItem[]> {
    const memoryPath = getNamespacePath(namespace);
    const vector = await embedText(query);
    if (!fs.existsSync(memoryPath)) return [];

    const data: MemoryItem[] = JSON.parse(fs.readFileSync(memoryPath, 'utf-8'));

    const scored = data.map((item) => ({
      ...item,
      score: cosineSimilarity(vector, item.vector),
    }));

    return scored.sort((a, b) => b.score - a.score).slice(0, topK);
  },
};