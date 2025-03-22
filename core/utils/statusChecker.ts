import { PrismaClient } from '@prisma/client';
import { askOllama } from '../ai/ollama.service';
import { config } from '../config';

const prisma = new PrismaClient();
const startTime = Date.now();

function formatUptime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export async function getBotStatus(): Promise<string> {
  let dbStatus = '❌';
  let aiStatus = '❌';

  // Check DB
  try {
    await prisma.user.findFirst();
    dbStatus = '✅';
  } catch (_) {}

  // Check AI
  try {
    const aiResponse = await askOllama('ping');
    if (aiResponse) aiStatus = '✅';
  } catch (_) {}

  return `🤖 ChronoSyncBot Status:
- Environment: ${config.environment}
- Uptime: ${formatUptime(Date.now() - startTime)}
- DB: Connected ${dbStatus}
- AI: Responding ${aiStatus}`;
}