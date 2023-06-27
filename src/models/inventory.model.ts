import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  outgoingQuantity: {
    type: Number,
    default: 0,
  },
  incomingQuantity: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: {
      values: ['in-stock', 'out-of-stock'],
      message: 'Status must be either in-stock or out-of-stock',
    },
    require: [true, 'Inventory must have a status'],
  },
});

const Inventory = mongoose.model('Inventory', schema);
export default Inventory;
