import TelegramBot from 'node-telegram-bot-api';
import { config } from '../../core/config/index.js';
import { handleCommand } from './handlers/commandHandler.js';
import { handleMessage } from './handlers/messageHandler.js';
import { logger } from './utils/logger.js';

const bot = new TelegramBot(config.telegram.token, { polling: true });

bot.on('message', async (msg) => {
  if (msg.text?.startsWith('/')) {
    handleCommand(bot, msg);
  } else {
    handleMessage(bot, msg);
  }
});

logger.info('🤖 Telegram bot is running...');