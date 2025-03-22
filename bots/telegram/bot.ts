import TelegramBot from 'node-telegram-bot-api';
import { config } from '../../core/config';
import { handleCommand } from './handlers/commandHandler';
import { handleMessage } from './handlers/messageHandler';
import { logger } from './utils/logger';
import { databaseService } from '../../core/services/database.service';
;
const bot = new TelegramBot(config.telegram.token, { polling: true });

bot.on('message', async (msg) => {
  if (msg.text?.startsWith('/')) {
    handleCommand(bot, msg);
  } else {
    handleMessage(bot, msg);
  }
});

logger.info('🤖 Telegram bot is running...');