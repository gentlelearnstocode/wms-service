import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserModel } from '../../models';
import Message from '../../constants/Message';
import { configService } from '../../configs';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (typeof token !== 'undefined') {
    jwt.verify(token, configService.JWT_SECRET, async (_, authData: any) => {
      if (authData) {
        try {
          const userData = await UserModel.findById({ _id: authData?.id });
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
