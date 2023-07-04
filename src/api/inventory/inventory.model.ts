import mongoose, { Schema, Types } from 'mongoose';

const schema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    get: (v: Types.ObjectId) => v.toString(),
    required: [true, 'Inventory must be created with a productId'],
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
  warehouseId: {
    type: Schema.Types.ObjectId,
    get: (v: Types.ObjectId) => v.toString(),
  },
});

const Inventory = mongoose.model('Inventory', schema);
export default Inventory;
