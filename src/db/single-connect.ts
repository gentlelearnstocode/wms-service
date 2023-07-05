import mongoose, { ConnectOptions } from 'mongoose';

import { configService } from '../configs';
import { logger } from '../utils';

export class SingleConnect {
  private static instance: SingleConnect;

  private constructor() {
    const url = configService.MONGO_URI?.replace('<PASSWORD>', configService.DATABASE_PASSWORD);
    if (url !== '') {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions).catch((error) => logger.error(error));
    }
    mongoose.connection.on('error', () => logger.error('Database connection failed'));
    logger.info('Database connected successfully');
  }

  public static getInstance(): SingleConnect {
    if (!SingleConnect.instance) {
      SingleConnect.instance = new SingleConnect();
    }
    return SingleConnect.instance;
  }
}
