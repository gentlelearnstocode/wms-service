import mongoose, { Date, Document, Schema, Types } from 'mongoose';
import validator from 'validator';

interface UserDoc extends Document {
  email: string;
  role: string;
  password: string;
  warehouses: Types.ObjectId[];
  createdAt: Date;
}

const schema = new Schema<UserDoc>({
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'User email must be valid'],
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'manager', 'staff'],
      message: 'User role must be valid',
    },
    default: 'staff',
    required: [true, 'User must have a role'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 8,
    select: false,
  },
  warehouses: [
    {
      warehouseId: {
        type: Schema.Types.ObjectId,
        get: (v: mongoose.ObjectId) => v.toString(),
        require: [true, 'A user must belong to at least one warehouse'],
      },
      _id: false,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


const UserModel = mongoose.model<UserDoc>('User', schema);

export default UserModel;
