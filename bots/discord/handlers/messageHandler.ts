import { Client, Message } from 'discord.js';
import { isAuthorizedUser } from '../middlewares/auth';
import { logger } from '../utils/logger';
import { commandRegistry } from '../commands';
import { databaseService } from '../../../core/services/database.service';

export async function handleMessage(client: Client, message: Message) {
  if (message.author.bot || !message.content.startsWith('!')) return;

  const [cmdName] = message.content.slice(1).split(' ');

  logger.info(`Command received: !${cmdName} from ${message.author.username}`);

  const command = commandRegistry.find(cmd => cmd.name === cmdName);

  // Log user to DB
  await databaseService.addOrUpdateUser({
    discordId: message.author.id,
    username: message.author.username,
  });

  if (!isAuthorizedUser(message)) {
    return message.reply('⛔ You are not authorized to use this bot.');
  }

  if (command) {
    command.execute(client, message);
  } else {
    message.reply('🤖 Unknown command. Try !help');
  }
}