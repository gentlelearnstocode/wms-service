import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Product must have a name'],
  },
  price: {
    type: Number,
    require: [true, 'Product must have price'],
  },
  quantity: {
    type: Number,
    require: [true, 'Product must have quanity'],
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
    require: true,
  },
});

const Product = mongoose.model('Product', schema);

export default Product;
