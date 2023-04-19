import mongoose, { Schema, Types, Document, Date } from 'mongoose';

export interface ProductDoc extends Document {
  name: string;
  price: number;
  type: string;
  createdAt: Date;
  warehouse: Types.ObjectId[];
  imageUrl: string;
}

const schema = new Schema<ProductDoc>({
  name: {
    type: String,
    required: [true, 'Product must have a name'],
  },
  price: {
    type: Number,
    required: [true, 'Product must have price'],
  },
  type: {
    type: String,
    enum: {
      values: ['RAW_MATERIAL', 'WORK_IN_PROGRESS', 'SUPPLIES', 'FINISHED_GOOD'],
      message: 'Product type must be valid',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  warehouse: [
    {
      type: Types.ObjectId,
      ref: 'Warehouse',
      required: [true, 'A newly created product must belong to at least one warehouse'],
    },
  ],
  imageUrl: {
    type: String,
    required: true,
    default:
      'https://www.ikea.com/sg/en/images/products/ikea-365-ihopparlig-wooden-chopping-board__0732009_PE729202_S5.JPG?f=s',
  },
});

const Product = mongoose.model<ProductDoc>('Product', schema);

export default Product;
