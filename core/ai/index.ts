import { askOllama } from './ollama.service';
import { memoryStore } from './memory.store';
import { learnFrom } from './trainer';
import { extractNameFromMessage } from '../utils/detectors';

export async function askWithMemory(prompt: string, userId: string, isPrivate = false): Promise<string> {
  const namespace = isPrivate ? `private:${userId}` : 'shared';

  // 🧠 Learn from explicit "my name is" patterns
  const extractedName = extractNameFromMessage(prompt);
  if (extractedName) {
    await learnFrom({
      content: `The user's name is ${extractedName}`,
      query: prompt,
      source: 'user-identity',
      namespace,
    });
  }

  // 🔍 Retrieve past context
  const memories = await memoryStore.search(prompt, namespace);

  // 🧠 Look for a name in memory
  const nameMemory = memories.find(m =>
    /user'?s name is|you can call me/i.test(m.content)
  );

  const nameContext = nameMemory
    ? `User's name is remembered as: ${nameMemory.content}.`
    : `User has not shared their name yet. If they ask, prompt them kindly.`;

  const context = [nameContext, ...memories.map(m => m.content)].join('\n\n');

  const personality = `
You are Chrono, a highly intelligent assistant who speaks naturally and respectfully.
You’re curious, witty, and helpful, like a nerdy best friend with a dry sense of humor.
Never sound robotic or overly formal. Keep things chill, smart, and interesting.
`;

  const finalPrompt = context
    ? `${personality}\n\nHere is context from past interactions:\n${context}\n\nNow respond to:\n${prompt}`
    : `${personality}\n\nUser said:\n${prompt}`;

  const response = await askOllama(finalPrompt);

  // 🧠 Learn from response
  await learnFrom({
    query: prompt,
    content: response,
    source: 'conversation',
    namespace,
  });

  return response;
}