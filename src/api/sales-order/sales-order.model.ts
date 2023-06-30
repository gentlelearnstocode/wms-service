import mongoose, { Document, Schema, SchemaTypes } from 'mongoose';

import { ISalesOrderProduct } from '../../interfaces/sales-order.interfaces';
import { SOStatus } from '../../constants/enums';

export interface SalesOrderDoc extends Document {
  SONumber: number;
  status: string;
  products: ISalesOrderProduct[];
}

const schema = new Schema<SalesOrderDoc>({
  SONumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: Array.from(Object.values(SOStatus)),
      message: 'invalid sales order status',
    },
    default: SOStatus.PENDING,
    required: [true, 'Sales order must have a status'],
  },
  products: [
    {
      id: {
        type: SchemaTypes.ObjectId,
        get: (v: any) => v?.toString(),
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
});

const SalesOrderModel = mongoose.model<SalesOrderDoc>('SalesOrder', schema);

export default SalesOrderModel;
