import { askOllama } from './ollama.service';

export async function askAI(prompt: string): Promise<string> {
  return askOllama(prompt);
}