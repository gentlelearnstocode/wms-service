import mongoose from 'mongoose';
import { InventoryStatus } from '../../constants/enums';

const schema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
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
      values: [InventoryStatus.IN_STOCK, InventoryStatus.OUT_OF_STOCK],
      message: 'Status must be either in-stock or out-of-stock',
    },
    require: [true, 'Inventory must have a status'],
  },
});

const Inventory = mongoose.model('Inventory', schema);
export default Inventory;
