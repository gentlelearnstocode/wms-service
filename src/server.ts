import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { useExpressServer } from 'routing-controllers';
import 'reflect-metadata';

import { ProductRoutes, UserRoutes, AuthRoutes, SupplierRoutes, WarehouseRoutes } from './api/routes';
import { ErrorController } from './api/controllers/error.controller';
import { AppError } from './utils';
import MainRoutes from './constants/MainRoutes';
import { configService } from './configs';
import { ConfigService } from './configs/config.service';
import { logger } from './utils';
import { Connection, dbConnection } from './db';

class App {
  private app: Application = express();
  private configService: ConfigService = configService;
  private logger = logger;
  private databaseConnection: Connection = dbConnection;
  constructor() {
    this.bootstrap();
  }
  async bootstrap() {
    this.registerExpressConfig();
    await this.registerDatabase();
    this.registerLogger();
    this.registerRoutingControllers();
    this.registerGlobalErrorHandler();
    this.app.use(ErrorController);
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
    // useExpressServer(this.app, {
    //   routePrefix: '/api/v1',
    //   controllers: [WarehouseController],
    //   defaultErrorHandler: false,
    //   classTransformer: true,
    // });
    this.app.use(MainRoutes.USERS, UserRoutes);
    this.app.use(MainRoutes.WAREHOUSES, WarehouseRoutes);
    this.app.use(MainRoutes.PRODUCTS, ProductRoutes);
    this.app.use(MainRoutes.AUTH, AuthRoutes);
    this.app.use(MainRoutes.SUPPLIERS, SupplierRoutes);
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
  }

  private registerLogger() {
    this.app.use((req, _, next) => {
      this.logger = logger.info(`Request body: ${JSON.stringify(req.body)}`);
      next();
    });
  }
}

new App();
