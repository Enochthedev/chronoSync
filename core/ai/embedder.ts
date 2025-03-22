import fetch from 'node-fetch';
import { listAvailableModels } from './ollama.service.js';

export async function embedText(text: string): Promise<number[]> {
  try {
    // Get list of available models
    const models = await listAvailableModels();

    // Prefer models known to support embeddings (avoid codellama, gguf, etc.)
    const model = models.find(m =>
      !m.includes('codellama') && !m.includes('gguf') && !m.includes('llama3')
    );

    if (!model) throw new Error('❌ No compatible embedding model found.');

    const response = await fetch('http://localhost:11434/api/embeddings', {
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