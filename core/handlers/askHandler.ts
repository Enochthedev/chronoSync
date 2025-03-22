import { askOllama } from '../ai/ollama.service.js';

export async function handleAskCommand(
  prompt: string,
  replyFn: (response: string) => void
): Promise<void> {
  try {
    const response = await askOllama(prompt);
    replyFn(response);
  } catch (err) {
    replyFn('❌ Failed to get a response from AI.');
  }
}