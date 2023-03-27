import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../models';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (typeof token !== 'undefined') {
    jwt.verify(token, process.env.JWT_SECRET!, async (_, authData: any) => {
      if (authData) {
        try {
          const userData = await User.findById({ _id: authData?.id });
          req.body = { ...req.body, user: userData };
          next();
        } catch (error) {
          res.status(500).json({
            message: 'Internal server error',
          });
        }
      } else {
        res.status(403).json({
          message: 'Forbidden. Invalid token',
        });
      }
    });
  } else {
    res.status(401).json({
      message: 'Unauthorized request',
    });
  }
};

export default verifyToken;
