import mongoose, { Document, Schema, Types } from 'mongoose';
import { SOStatus } from '../../constants/enums';
import { BaseDoc } from '../../interfaces/base.interface';
import { ISalesOrderProduct } from './interfaces/sales-order.interface';

export interface SalesOrderDoc extends Document, BaseDoc {
  SONumber: number;
  status: string;
  products: ISalesOrderProduct[];
  warehouseId: Schema.Types.ObjectId;
  issuedAt?: Schema.Types.Date;
  totalOrderQuantity?: number;
}

const schema = new Schema<SalesOrderDoc>({
  SONumber: {
    type: Number,
    required: true,
  },
  products: [
    {
      id: {
        type: Schema.Types.ObjectId,
        get: (v: Types.ObjectId) => v?.toString(),
      },
      name: {
        type: String,
      },
      orderQuantity: {
        type: Number,
        required: [true, 'order quantity must be valid'],
      },
      _id: false,
    },
  ],
  status: {
    type: String,
    enum: {
      values: Array.from(Object.values(SOStatus)),
    },
  },
  warehouseId: {
    type: Schema.Types.ObjectId,
    get: (v: Types.ObjectId) => v.toString(),
    required: [true, 'sales order must belong to a warehouse'],
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  issuedAt: {
    type: Date,
  },
  totalOrderQuantity: { type: Number },
});

const SalesOrderModel = mongoose.model<SalesOrderDoc>('SalesOrder', schema);

export default SalesOrderModel;
