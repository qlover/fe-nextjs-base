import appConfig from '@/config/appConfig';
import { isBrower } from '@/config/nextEnv';

export function clientLog(...message: any[]) {
  if (isBrower()) {
    if (appConfig.appEnv !== 'master') {
      console.log('[client]', ...message);
    }
  }
}
export function serverLog(...message: any[]) {
  console.log('[server]', ...message);
}
