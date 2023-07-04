import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'reflect-metadata';
import { auth, inventory, product, salesOrder, supplier, user, warehouse } from './api';
import { ErrorController } from './controllers/error.controller';
import { AppError, logger } from './utils';
import { configService } from './configs';
import { ConfigService } from './configs/config.service';
import { Connection, dbConnection } from './db';

class App {
  app: Application = express();
  configService: ConfigService = configService;
  logger = logger;
  databaseConnection: Connection = dbConnection;

  constructor() {
    this.bootstrap().catch((error) => this.logger.error(error));
  }

  private async bootstrap() {
    this.registerExpressConfig();
    await this.registerDatabase();
    this.registerLogger();
    this.registerRoutingControllers();
    this.registerGlobalErrorHandler();
    await this.registerServer();
  }

  private async registerDatabase() {
    await this.databaseConnection.connectDB();
  }

  private registerExpressConfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(cors());
  }

  private registerRoutingControllers() {
    [warehouse, product, user, salesOrder, auth, supplier, inventory].forEach((route) =>
      this.app.use(this.configService.API_VERSION, route));
  }

  private async registerServer() {
    this.app.listen(this.configService.PORT, () => {
      this.logger.info(`🔈 Server is running on port: ${this.configService.PORT}`);
    });
  }

  private registerGlobalErrorHandler() {
    this.app.all('*', (req, _, next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
    });
    this.app.use(ErrorController);
  }

  private registerLogger() {
    this.app.use((req, _, next) => {
      this.logger = logger.info(`Request body: ${JSON.stringify(req.body)}`);
      next();
    });
  }
}

new App();
