import { askOllama } from './ollama.service.js';
import { memoryStore } from './memory.store.js';
import { learnFrom } from './trainer.js';
import { analyzeText } from '../nlp/index.js'; // 🧠 NLP module

export async function askWithMemory(prompt: string, userId: string, isPrivate = false): Promise<string> {
  const namespace = isPrivate ? `private:${userId}` : 'shared';

  // 🧠 Run NLP
  const { intent, entities } = analyzeText(prompt);
  console.log('🧠 Detected Intent:', intent);

  // 👤 Store name dynamically if found
  if (entities.name) {
    await learnFrom({
      content: `The user's name is ${entities.name}.`,
      query: prompt,
      source: 'user-identity',
      namespace,
    });
  }

  // 🧠 Load memory
  const memories = await memoryStore.search(prompt, namespace);
  const nameMemory = memories.find(m =>
    /user's name is|you can call me|my name is/i.test(m.content)
  );

  const nameContext = nameMemory
    ? `The user's name is: ${nameMemory.content}\n\n`
    : '';

  const context = nameContext + memories.map(m => m.content).join('\n\n');


  // 🧑‍🚀 Chrono Personality
  const personality = `
You are Chrono — a clever, nerdy assistant who speaks naturally like a real person. 
Avoid roleplaying conversations (no "User:" or "Chrono:"). 
Be smart, witty, and mildly sarcastic when it fits — but never overdo it.
Only answer what’s asked. Don’t create imagined dialogue.
Speak casually, like a high-IQ friend who reads too many sci-fi comics.
`;

  const finalPrompt = context
    ? `${personality}\n\nBased on the context below, respond to the user's message:\n\n${context}\n\nUser: ${prompt}`
    : `${personality}\n\nUser: ${prompt}`;

  console.log('🧠 Final Prompt Sent to Ollama:\n', finalPrompt);

  const response = await askOllama(finalPrompt);
  console.log('🧠 Ollama Response:', response);

  if (!response || typeof response !== 'string' || response.trim() === '') {
    console.warn('❌ No response from Ollama.');
    return "🤖 Sorry, I didn't get a response from my AI core. Try again!";
  }

  // 💾 Learn from response
  await learnFrom({
    query: prompt,
    content: response,
    source: 'conversation',
    namespace,
  });

  return response;
}