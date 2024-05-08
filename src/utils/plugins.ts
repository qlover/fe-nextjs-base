import appConfig from 'config/app.config';
import { Logger } from 'packages/utils/Logger';

export const logger = Logger({ level: appConfig.env === 'prod' ? 0 : 1 });
