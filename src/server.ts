//Third party imports
import { config } from 'dotenv';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
//Local imports
import { ProductRoutes, WarehouseRoutes, UserRoutes, AuthRoutes } from './routes';
import { ErrorController } from './controllers/ErrorController';
import { AppError } from './utils/AppError';
import MainRoutes from './constants/MainRoutes';
import { Connection } from './db/connection';
//Config
config({ path: '.env' });
const app: Application = express();
const PORT = process.env.PORT || 8001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
//Database
const databaseURL = process.env.DATABASE?.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!) || '';
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

//Global error handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(ErrorController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
