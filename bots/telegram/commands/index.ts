import { startCommand } from './start.js';
import { helpCommand } from './help.js';
import { statusCommand } from './status.js';
import { askCommand } from './ask.js';

// import more commands here...

export const commandRegistry = [
    startCommand,
    helpCommand,
    statusCommand,
    askCommand,
]; // Add more commands to this array
// This array will be used to register commands in the bot