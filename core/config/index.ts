// core/config.ts

import dotenv from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

// === Environment Detection ===
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : fs.existsSync('.env.development')
    ? '.env.development'
    : '.env';

dotenv.config({ path: resolve(process.cwd(), envFile) });

export const config = {
  environment: process.env.NODE_ENV || 'development',

  // Telegram
  telegram: {
    token: process.env.TELEGRAM_TOKEN || '',
    authorizedUsers: (process.env.TELEGRAM_AUTHORIZED_USERS || '')
      .split(',')
      .map(u => u.trim())
      .filter(Boolean),
  },

  // Discord
  discord: {
    token: process.env.DISCORD_TOKEN || '',
    guildId: process.env.GUILD_ID || '',
    authorizedUsers: (process.env.DISCORD_AUTHORIZED_USERS || '')
      .split(',')
      .map(u => u.trim())
      .filter(Boolean),
  },

  // Shared DB (Optional)
  databaseUrl: process.env.DATABASE_URL || 'file:./default.db',
};