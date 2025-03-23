import { normalize } from './utils.js';

export function extractName(text: string): string | null {
  const match = text.match(/(?:my name is|call me|i am)\s+([a-zA-Z]+)/i);
  return match ? normalize(match[1]) : null;
}

export function extractDate(text: string): string | null {
  const match = text.match(/\b(?:on\s)?(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)\b/);
  return match ? match[1] : null;
}