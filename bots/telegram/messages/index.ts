import { helloProcessor } from './hello.js';
import { echoProcessor } from './echo.js';

export const messageProcessors = [
  helloProcessor,
  echoProcessor, // keep fallback last
];