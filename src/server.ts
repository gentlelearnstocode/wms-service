//Third party imports
import { config } from 'dotenv';
import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
//Local imports
import ProductRoutes from './routes/ProductRoutes';
//Config
config({ path: '.env' });
const app: Application = express();
const PORT = process.env.PORT || 8001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use('/api/v1/products', ProductRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
