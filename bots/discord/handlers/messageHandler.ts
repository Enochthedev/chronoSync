import { Client, Message } from 'discord.js';
import { isAuthorizedUser } from '../middlewares/auth.js';
import { logger } from '../utils/logger.js';
import { commandRegistry } from '../commands/index.js';
import { databaseService } from '../../../core/services/database.service.js';
import { askWithMemory } from '../../../core/ai/index.js'; // update this import

export async function handleMessage(client: Client, message: Message) {
  if (message.author.bot) return;

  const content = message.content;
  const username = message.author.username;
  const userId = message.author.id;

  // Log user to DB
  await databaseService.addOrUpdateUser({
    discordId: userId,
    username,
  });

  logger.info(`Message from ${username}: ${content}`);

  if (!isAuthorizedUser(message)) {
    return message.reply('⛔ You are not authorized to use this bot.');
  }

  // 🤖 Handle commands
  if (content.startsWith('!')) {
    const [cmdName] = content.slice(1).split(' ');
    const command = commandRegistry.find(cmd => cmd.name === cmdName);
    if (command) return command.execute(client, message);
    return message.reply('🤖 Unknown command. Try !help');
  }

  // 💬 Natural language chat (memory-aware)
  const response = await askWithMemory(content, userId);
  return message.reply(response);
}