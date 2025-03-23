import { detectIntent } from './intent.js';
import { extractName, extractDate } from './entities.js';

export interface NLPResult {
  intent: string;
  entities: Record<string, string | null>;
}
/**
 * Analyzes the input message to determine its intent and extract entities.
 * @param {string} message - The input message to analyze.
 * @returns {NLPResult} - The result containing the detected intent and extracted entities.
 */
export function analyzeText(message: string): NLPResult {
  const intent = detectIntent(message);

  const entities = {
    name: extractName(message),
    date: extractDate(message),
  };

  return { intent, entities };
}