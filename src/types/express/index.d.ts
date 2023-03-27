import express from 'express';

import { User } from '../User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
