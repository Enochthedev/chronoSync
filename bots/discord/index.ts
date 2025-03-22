import { Client, GatewayIntentBits, Events } from 'discord.js';
import { config } from '../../core/config/index.js'
import { logger } from './utils/logger.js';
import { handleMessage } from './handlers/messageHandler.js';

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