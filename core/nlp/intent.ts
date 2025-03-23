import { tokenize } from './utils.js';

const intents = [
  { label: 'greeting', patterns: ['hi', 'hello', 'hey', 'good morning', 'good evening'] },
  { label: 'identity', patterns: ['my name is', 'call me', 'i am'] },
  { label: 'ask_name', patterns: ['what is your name', 'who are you'] },
  { label: 'request_help', patterns: ['help', 'how do i', 'what can you do'] },
  { label: 'general_chat', patterns: ['how are you', 'what\'s up', 'tell me something'] },
];

export function detectIntent(text: string): string {
  const lowered = text.toLowerCase();

  for (const intent of intents) {
    if (intent.patterns.some(p => lowered.includes(p))) {
      return intent.label;
    }
  }

  return 'unknown';
}