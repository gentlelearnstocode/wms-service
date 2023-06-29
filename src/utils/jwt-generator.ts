import jwt from 'jsonwebtoken';
import { configService } from '../configs';

export const jwtGenerator = (id: string) => {
  return jwt.sign({ id }, configService.JWT_SECRET, {
    expiresIn: configService.JWT_EXPIRES_IN,
    algorithm: 'HS256',
  });
};
