import chalk from 'chalk';

console.clear();
console.log(chalk.blueBright('🤖 ChronoSyncBot Initializing...'));
console.log(chalk.gray('-------------------------------\n'));

(async () => {
  try {
    console.log(chalk.yellow('🤝 Starting Telegram Bot...'));
    await import('./bots/telegram/index.js');
    console.log(chalk.green('✅ Telegram Bot is up and running!'));

    console.log(chalk.yellow('🤝 Starting Discord Bot...'));
    await import('./bots/discord/index.js');
    console.log(chalk.green('✅ Discord Bot is up and running!'));

    console.log(chalk.blueBright('\n🚀 All systems go. ChronoSyncBot is fully operational.'));
  } catch (error) {
    console.error(chalk.red('❌ Failed to launch ChronoSyncBot:'), error);
  }
})();