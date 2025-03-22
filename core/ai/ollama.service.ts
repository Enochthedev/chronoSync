import fetch from 'node-fetch';
import { execSync, spawn } from 'child_process';

const OLLAMA_URL = 'http://localhost:11434';
const DEFAULT_MODEL = 'llama3';

export async function isOllamaRunning(): Promise<boolean> {
  try {
    const res = await fetch('http://host.docker.internal:11434');
    return res.ok;
  } catch {
    return false;
  }
}

export function startOllamaServe(): void {
  console.log('🧠 Starting Ollama server...');
  
}

export async function listAvailableModels(): Promise<string[]> {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`);
    const json = (await res.json()) as { models: { name: string }[] };
    return json.models.map((model) => model.name);
  } catch {
    return [];
  }
}

export async function askOllama(prompt: string): Promise<string> {
  const running = await isOllamaRunning();
  if (!running) startOllamaServe();

  const models = await listAvailableModels();
  const model = models.includes(DEFAULT_MODEL) ? DEFAULT_MODEL : models[0];

  if (!model) return '❌ No Ollama models found. Please run `ollama pull llama3`.';

  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = (await res.json()) as { response?: string };
  return data.response || '[No response from AI]';
}