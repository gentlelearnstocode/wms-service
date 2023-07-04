import mongoose, { Date, Document, Schema, Types } from 'mongoose';

export interface ProductDoc extends Document {
  name: string;
  price: number;
  type: string;
  createdAt: Date;
  imageUrl: string;
  suppliers: Types.ObjectId[];
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
  imageUrl: {
    type: String,
    required: true,
    default:
      'https://www.ikea.com/sg/en/images/products/ikea-365-ihopparlig-wooden-chopping-board__0732009_PE729202_S5.JPG?f=s',
  },
  suppliers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Supplier',
      required: [true, 'A product must have at least one supplier'],
    },
  ],
});

const ProductModel = mongoose.model<ProductDoc>('Product', schema);

export default ProductModel;
