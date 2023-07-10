import mongoose, { Document, Schema, Types } from 'mongoose';
import { SOStatus } from '../../constants/enums';
import { BaseDoc } from '../../interfaces/base.interface';
import { ISalesOrderProduct } from './interfaces/sales-order.interface';

export interface SalesOrderDoc extends Document, BaseDoc {
  SONumber: number;
  status: string;
  products: ISalesOrderProduct[];
  warehouse: Schema.Types.ObjectId;
  issuedAt?: Schema.Types.Date;
  totalOrderQuantity?: number;
}

export const salesOrderSchema = new Schema<SalesOrderDoc>({
  SONumber: {
    type: Number,
    required: true,
  },
  products: [
    {
      orderQuantity: { type: Number, required: [true, 'order quantity must be valid'] },
      product: {
        type: Schema.Types.ObjectId,
        get: (v: Types.ObjectId) => v?.toString(),
        ref: 'Product',
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
  warehouse: {
    type: Schema.Types.ObjectId,
    // get: (v: Types.ObjectId) => v.toString(),
    required: [true, 'sales order must belong to a warehouse'],
    ref: 'Warehouse',
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

const SalesOrderModel = mongoose.model<SalesOrderDoc>('SalesOrder', salesOrderSchema);

export default SalesOrderModel;
