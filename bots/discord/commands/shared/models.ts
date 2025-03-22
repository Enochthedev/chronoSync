import { Client, Message } from 'discord.js';
import { listAvailableModels } from '../../../../core/ai/ollama.service';

export const modelsCommand = {
  name: 'models',
  description: 'List available Ollama AI models',
  async execute(_client: Client, message: Message) {
    const models = await listAvailableModels();

    if (models.length === 0) {
      return message.reply('⚠️ No models found. Try pulling one using `ollama pull llama3`.');
    }

    const list = models.map((m, i) => `${i + 1}. \`${m}\``).join('\n');
    message.reply(`🧠 *Available AI Models:*\n${list}`);
  },
};