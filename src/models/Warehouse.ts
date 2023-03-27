import mongoose from 'mongoose';

// Create mongoose schema for warehouse database model
const schema = new mongoose.Schema({
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

const Warehouse = mongoose.model('Warehouse', schema);

export default Warehouse;
