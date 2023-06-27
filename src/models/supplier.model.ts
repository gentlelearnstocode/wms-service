import mongoose, { Schema, Types, Document, Date } from 'mongoose';

interface SupplierDoc extends Document {
  name: string;
  contact: {
    phone: number;
    email: string;
  };
  taxCode: string;
  addressInfo: {
    address: string;
    location: {
      longitude: string;
      latitude: string;
    };
  };
}

const schema = new Schema<SupplierDoc>({
  name: {
    type: String,
    required: [true, 'Supplier must have name'],
  },
  contact: {
    phone: {
      type: Number,
      required: [true, 'Supplier contact must have phone number'],
    },
    email: {
      type: String,
      required: [true, 'Supplier contact must have email'],
    },
  },
  taxCode: {
    type: String,
    required: [true, 'Supplier must have tax code'],
  },
  addressInfo: {
    address: {
      type: String,
      required: [true, 'Supplier must have address'],
    },
    location: {
      longitude: {
        type: String,
        required: [true, 'Supplier location must have longitude'],
      },
      latitude: {
        type: String,
        required: [true, 'Supplier location must have latitude'],
      },
    },
  },
});

const SupplierModel = mongoose.model<SupplierDoc>('Supplier', schema);

export default SupplierModel;
