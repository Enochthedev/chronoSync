import TelegramBot from 'node-telegram-bot-api';
import { config } from '../../../core/config';

export function isAuthorizedUser(msg: TelegramBot.Message): boolean {
  const allowed = config.telegram.authorizedUsers || [];
  const username = msg.from?.username || '';
  return allowed.includes(username);
}