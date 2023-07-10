import mongoose, { ConnectOptions } from 'mongoose';

import { configService } from '../configs';
import { ConfigService } from '../configs/config.service';
import { logger } from '../utils';

export class Connection {
  private readonly configService: ConfigService = configService;
  private readonly logger = logger;
  async connectDB() {
    const url = this.configService.MONGO_URI?.replace(
      '<PASSWORD>',
      this.configService.DATABASE_PASSWORD,
    );
    if (url !== '') {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
    }
    mongoose.connection.on('error', () => this.logger.error('Database connection failed'));
    this.logger.info('Database connected successfully');
  }
}
