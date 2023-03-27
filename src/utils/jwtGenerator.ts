import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config({ path: '.env' });

export const jwtGenerator = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: 'HS256',
  });
};
