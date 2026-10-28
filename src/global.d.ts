import { PrismaClient } from '@prisma/client'; // Example if using Prisma
import * as TemporalPolyfillNamespace from '@js-temporal/polyfill';

declare global {
  // This extends the globalThis type definition
  var Temporal: typeof TemporalPolyfillNamespace.Temporal; 
}

export {};
