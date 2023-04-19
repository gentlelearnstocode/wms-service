import mongoose from 'mongoose';

const schema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: [
        true,
        'A newly created product must belong to at least one warehouse',
      ],
    },
  ],
  imageUrl: {
    type: String,
    required: true,
    default:
      'https://www.ikea.com/sg/en/images/products/ikea-365-ihopparlig-wooden-chopping-board__0732009_PE729202_S5.JPG?f=s',
  },
});

const Product = mongoose.model('Product', schema);

export default Product;
