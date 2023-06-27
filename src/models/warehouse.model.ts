import mongoose, { Schema, Document, Date } from 'mongoose';

interface WarehouseDoc extends Document {
  name: string;
  address: string;
  createdAt: Date;
  // warehouseSequence: string;
}

// Create mongoose schema for warehouse database model
const schema = new Schema<WarehouseDoc>({
  name: {
    type: String,
    required: [true, 'Warehouse must have a name'],
  },
  address: {
    type: String,
    required: [true, 'Warehouse must have an address'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const WarehouseModel = mongoose.model<WarehouseDoc>('Warehouse', schema);

export default WarehouseModel
