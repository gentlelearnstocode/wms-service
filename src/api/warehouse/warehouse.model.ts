import mongoose, { Date, Document, Schema } from 'mongoose';

interface WarehouseDoc extends Document {
  name: string;
  address: string;
  createdAt: Date;
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
    default: new Date(),
  },
});

const WarehouseModel = mongoose.model<WarehouseDoc>('Warehouse', schema);

export default WarehouseModel;
