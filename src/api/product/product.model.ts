import mongoose, { Date, Document, Schema, Types } from 'mongoose';
import { ProductTypes } from '../../constants/enums';

export interface ProductDoc extends Document {
  name: string;
  price: number;
  type: string;
  createdAt: Date;
  imageUrl: string;
  suppliers: Types.ObjectId[];
}

export const productSchema = new Schema<ProductDoc>({
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
      values: Array.from(Object.values(ProductTypes)),
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
    default: '',
  },
  suppliers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Supplier',
    },
  ],
});

const ProductModel = mongoose.model<ProductDoc>('Product', productSchema);

export default ProductModel;
