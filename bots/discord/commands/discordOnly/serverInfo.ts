import { Client, Message } from 'discord.js';

export const serverInfoCommand = {
  name: 'serverinfo',
  description: 'Displays server name and member count.',
  execute(_client: Client, message: Message) {
    if (!message.guild) return message.reply('⚠️ This command can only be used in servers.');
    
    const { name, memberCount } = message.guild;
    message.reply(`📊 Server: **${name}**\n👥 Members: **${memberCount}**`);
  },
};