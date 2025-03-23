import fetch from 'node-fetch';
import { spawn } from 'child_process';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const PREFERRED_MODELS = ['gemma:2b', 'smolLM2:1.7b'];

export async function isOllamaRunning(): Promise<boolean> {
  try {
    const res = await fetch(`${OLLAMA_HOST}`);
    return res.ok;
  } catch {
    return false;
  }
}

export function startOllamaServe(): void {
  console.log('🧠 Starting Ollama server...');
  try {
    const child = spawn('ollama', ['serve']);
    child.stdout.on('data', data => console.log(`[ollama] ${data}`));
    child.stderr.on('data', data => console.error(`[ollama err] ${data}`));
    child.on('close', code => console.log(`🧠 Ollama exited with code ${code}`));
  } catch (err) {
    console.error('❌ Failed to start Ollama server:', err);
  }
}

export async function listAvailableModels(): Promise<string[]> {
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/tags`);
    const json = (await res.json()) as { models: { name: string }[] };
    return json.models.map(model => model.name);
  } catch (err) {
    console.error('❌ Failed to fetch Ollama models:', err);
    return [];
  }
}

export async function askOllama(prompt: string): Promise<string> {
  const running = await isOllamaRunning();
  if (!running) startOllamaServe();

  const models = await listAvailableModels();

  const ignored = ['nomic-embed-text', 'mxbai-embed-large', 'all-minilm', 'gguf'];
  const usable = models.filter(
    model => !ignored.some(ignore => model.includes(ignore))
  );

  const selected =
    PREFERRED_MODELS.find(m => usable.includes(m)) || usable[0];

  if (!selected) return '❌ No compatible Ollama models found for generation.';

  const finalPrompt = prompt.trim();
  console.log(`🧠 Sending prompt to Ollama model "${selected}"...`);
  console.log('🧠 Final Prompt Sent to Ollama:\n', finalPrompt);

  const res = await fetch(`${OLLAMA_HOST}/api/generate`, {
    method: 'POST',
    body: JSON.stringify({ model: selected, prompt: finalPrompt, stream: false }),
    headers: { 'Content-Type': 'application/json' },
  });

  try {
    const data = (await res.json()) as { response?: string };
    if (!data.response) {
      console.warn('⚠️ Ollama responded without a `response` field:', data);
    }
    return data.response || '[No response from Ollama]';
  } catch (err) {
    console.error('❌ Failed to parse Ollama response:', err);
    return '';
  }
}