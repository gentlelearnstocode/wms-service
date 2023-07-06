import mongoose, { Document, Schema, Types } from 'mongoose';

import { ISalesOrderProduct } from './interfaces/sales-order.interface';
import { SOStatus } from '../../constants/enums';

export interface SalesOrderDoc extends Document {
  SONumber: number;
  status: string;
  products: ISalesOrderProduct[];
  warehouseId: Schema.Types.ObjectId;
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
      message: 'invalid sales order status',
    },
    default: SOStatus.PENDING,
    required: [true, 'Sales order must have a status'],
  },
  warehouseId: {
    type: Schema.Types.ObjectId,
    get: (v: Types.ObjectId) => v.toString(),
    required: [true, 'sales order must belong to a warehouse'],
  },
});

const SalesOrderModel = mongoose.model<SalesOrderDoc>('SalesOrder', schema);

export default SalesOrderModel;
