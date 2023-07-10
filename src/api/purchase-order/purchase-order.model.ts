import mongoose, { Document, Schema, Types } from 'mongoose';
import { POStatus } from '../../constants/enums';
import { BaseDoc } from '../../interfaces/base.interface';
import { IPurchaseOrderProduct } from './interfaces/purchase-order.interface';

export interface PurchaseOrderDoc extends Document, BaseDoc {
  PONumber: number;
  status: string;
  products: IPurchaseOrderProduct[];
  warehouseId: Schema.Types.ObjectId;
  supplier: Schema.Types.ObjectId;
  receivedAt?: Schema.Types.Date;
  totalOrderQuantity?: Schema.Types.ObjectId;
}

const schema = new Schema<PurchaseOrderDoc>({
  PONumber: {
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
      values: Array.from(Object.values(POStatus)),
      message: 'invalid sales order status',
    },
    default: POStatus.PENDING,
    required: [true, 'Sales order must have a status'],
  },
  warehouseId: {
    type: Schema.Types.ObjectId,
    get: (v: Types.ObjectId) => v.toString(),
    required: [true, 'sales order must belong to a warehouse'],
  },
  createdAt: {
    type: Schema.Types.Date,
  },
  updatedAt: {
    type: Schema.Types.Date,
  },
  totalOrderQuantity: {
    type: Number,
  },
  receivedAt: {
    type: Schema.Types.Date,
  },
});

const PurchaseOrderModel = mongoose.model<PurchaseOrderDoc>('PurchaseOrder', schema);

export default PurchaseOrderModel;
