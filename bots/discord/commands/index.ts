import { pingCommand } from './shared/ping';
import { helpCommand } from './shared/help';
import { statusCommand } from './shared/status';
import { serverInfoCommand } from './discordOnly/serverInfo';
import { avatarCommand } from './discordOnly/avatar';
import { askCommand } from './shared/ask';
import { modelsCommand } from './shared/models';

export const commandRegistry = [
    pingCommand,
    helpCommand,
    statusCommand,
    serverInfoCommand,
    avatarCommand,
    askCommand,
    modelsCommand,
];