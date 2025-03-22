import { helloProcessor } from './hello';
import { echoProcessor } from './echo';

export const messageProcessors = [
  helloProcessor,
  echoProcessor, // keep fallback last
];