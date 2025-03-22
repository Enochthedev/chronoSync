import { pingCommand } from './shared/ping.js';
import { helpCommand } from './shared/help.js';
import { statusCommand } from './shared/status.js';
import { serverInfoCommand } from './discordOnly/serverInfo.js';
import { avatarCommand } from './discordOnly/avatar.js';
import { askCommand } from './shared/ask.js';
import { modelsCommand } from './shared/models.js';
import { browseCommand } from './shared/browse.js';
import { smartBrowseCommand } from './shared/smartbrowse.js';

export const commandRegistry = [
    pingCommand,
    helpCommand,
    statusCommand,
    serverInfoCommand,
    avatarCommand,
    askCommand,
    modelsCommand,
    browseCommand,
    smartBrowseCommand,
];