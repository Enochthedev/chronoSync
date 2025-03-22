import { startCommand } from './start';
import { helpCommand } from './help';
import { statusCommand } from './status';
import { askCommand } from './ask';

// import more commands here...

export const commandRegistry = [
    startCommand,
    helpCommand,
    statusCommand,
    askCommand,
]; // Add more commands to this array
// This array will be used to register commands in the bot