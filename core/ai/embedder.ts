import fetch from 'node-fetch';
import { listAvailableModels } from './ollama.service.js';

const DEFAULT_EMBED_MODELS = [
  'nomic-embed-text',
  'mxbai-embed-large',
  'all-minilm',
  'tinyllama',
];

// Support remote Ollama host
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';

export async function embedText(text: string): Promise<number[]> {
  try {
    const models = await listAvailableModels();
    console.log('📦 Available Ollama models:', models);

    const preferredModel = process.env.EMBED_MODEL;
    let model: string | undefined;

    if (preferredModel && models.includes(preferredModel)) {
      model = preferredModel;
      console.log(`✅ Using embedding model from .env: ${model}`);
    } else {
      model = models.find(m =>
        DEFAULT_EMBED_MODELS.some(known => m.includes(known))
      );
    }

    if (!model) throw new Error('❌ No compatible embedding model found.');

    const response = await fetch(`${OLLAMA_HOST}/api/embeddings`, {
      method: 'POST',
      body: JSON.stringify({ model, prompt: text }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = (await response.json()) as { embedding?: number[] };

    if (data.embedding && Array.isArray(data.embedding)) {
      return data.embedding;
    } else {
      console.warn('⚠️ Ollama returned no valid embedding. Using fallback.');
      return fallbackEmbedding(text);
    }
  } catch (err) {
    console.error('❌ Embedding failed. Using fallback method.', err);
    return fallbackEmbedding(text);
  }
}

function fallbackEmbedding(text: string): number[] {
  const safe = text || 'empty';
  return Array(256)
    .fill(0)
    .map((_, i) => safe.charCodeAt(i % safe.length) / 256);
}