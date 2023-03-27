//Third party imports
import { config } from 'dotenv';
import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import morgan from 'morgan';
//Local imports
import { ProductRoutes, WarehouseRoutes, UserRoutes } from './routes';
import { ErrorController } from './controllers/ErrorController';
import { AppError } from './utils/AppError';
import MainRoutes from './constants/MainRoutes';
import { verifyToken } from './middlewares';
//Config
config({ path: '.env' });
const app: Application = express();
const PORT = process.env.PORT || 8001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
//Database
const DB = process.env.DATABASE?.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!
);
mongoose
  .connect(DB!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log(`Database connection failed: ${err}`);
  });

//App
app.use((req, res, next) => {
  console.log('----------request body-----------', req.body);
  next();
});

app.use(MainRoutes.USERS, UserRoutes);
app.use(MainRoutes.WAREHOUSES, WarehouseRoutes);
app.use(MainRoutes.PRODUCTS, ProductRoutes);

//Global error handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(ErrorController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
