import { Client, Message } from 'discord.js';

export const avatarCommand = {
  name: 'avatar',
  description: 'Displays your avatar URL.',
  execute(_client: Client, message: Message) {
    const avatarUrl = message.author.displayAvatarURL({ extension: 'png', size: 1024 });
    message.reply(`🖼️ Your avatar: ${avatarUrl}`);
  },
};