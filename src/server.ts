//Third party imports
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
//Local imports
import { ProductRoutes, WarehouseRoutes, UserRoutes, AuthRoutes, SupplierRoutes } from './routes';
import { ErrorController } from './controllers/error.controller';
import { AppError } from './utils/AppError';
import MainRoutes from './constants/MainRoutes';
import { Connection } from './db/connection';
import { configService } from './configs';
//Config
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
//Database
const databaseURL = configService.MONGO_URI?.replace('<PASSWORD>', configService.DATABASE_PASSWORD) || '';
const start = async () => await Connection.connectDB(databaseURL);
start();



//App
app.use((req, res, next) => {
  console.log('----------request body-----------', req.body);
  next();
});

app.use(cors());

app.use(MainRoutes.USERS, UserRoutes);
app.use(MainRoutes.WAREHOUSES, WarehouseRoutes);
app.use(MainRoutes.PRODUCTS, ProductRoutes);
app.use(MainRoutes.AUTH, AuthRoutes);
app.use(MainRoutes.SUPPLIERS, SupplierRoutes);

//Global error handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(ErrorController);

app.listen(configService.PORT, () => {
  console.log(`Server running on port ${configService.PORT}`);
});
