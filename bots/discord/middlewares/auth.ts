import { Message } from 'discord.js';
import { config } from '../../../core/config';

export function isAuthorizedUser(message: Message): boolean {
  const allowed = config.discord.authorizedUsers;
  const username = message.author.username;

  console.log('[AUTH DEBUG] Allowed:', allowed);
  console.log('[AUTH DEBUG] Username:', username);

  return allowed.includes(username);
}