import jwt from 'jsonwebtoken';
import { configService } from '../configs';

export const jwtGenerator = (id: any) => {
  return jwt.sign({ id }, configService.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: 'HS256',
  });
};
