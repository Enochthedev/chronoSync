import { Client, GatewayIntentBits, Events } from 'discord.js';
import { config } from '../../core/config'
import { logger } from './utils/logger';
import { handleMessage } from './handlers/messageHandler';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  logger.info(`Bot is online as ${client.user?.tag}`);
});

client.on(Events.MessageCreate, (message) => {
  handleMessage(client, message);
});

client.login(config.discord.token);