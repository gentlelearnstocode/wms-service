import mongoose, { ConnectOptions } from 'mongoose';

export class Connection {
  static async connectDB(url: string) {
    if (url !== '') {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
    }

    mongoose.connection.on('error', () => console.log('Database connection failed'));
    console.log('Database connected successfully');
  }
}
