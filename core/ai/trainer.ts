import { memoryStore } from './memory.store.js';

interface LearnInput {
  content: string;
  source: string;
  namespace: string;
  query?: string;
  url?: string;
}

export async function learnFrom(input: LearnInput) {
  const messageLength = input.content.length;

  // Simple chunk logic
  const chunks = messageLength > 2000
    ? input.content.match(/.{1,2000}/g) || [input.content]
    : [input.content];

  for (const chunk of chunks) {
    await memoryStore.add(chunk, {
      source: input.source,
      namespace: input.namespace,
      query: input.query,
      url: input.url,
    });
  }
}