import { Client, Message } from 'discord.js';

export const pingCommand = {
  name: 'ping',
  description: 'Replies with Pong!',
  execute: (client: Client, message: Message) => {
    message.reply('🏓 Pong!');
  },
};