import { Schema } from 'mongoose';

export interface BaseDoc {
  createdAt: Schema.Types.Date;
  updatedAt?: Schema.Types.Date;
  createdBy?: string;
  updatedBy?: string;
}
