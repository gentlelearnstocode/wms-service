import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../models';
import Message from '../../constants/Message';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (typeof token !== 'undefined') {
    jwt.verify(token, process.env.JWT_SECRET!, async (_, authData: any) => {
      if (authData) {
        try {
          const userData = await User.findById({ _id: authData?.id });
          req.body = { ...req.body, user: userData };
          next();
        } catch (error) {
          res.status(500).json({
            message: Message.INTERNAL_SERVER_ERROR,
          });
        }
      } else {
        res.status(403).json({
          message: Message.FORBIDDEN_INVALID_TOKEN,
        });
      }
    });
  } else {
    res.status(401).json({
      message: Message.UNAUTHORIZED_REQUEST,
    });
  }
};

export default verifyToken;
