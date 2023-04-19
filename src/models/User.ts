import mongoose, { Date, Schema, Types, Document } from 'mongoose';
import validator from 'validator';

export interface UserDoc extends Document {
  email: string;
  role: string;
  password: string;
  warehouse: Types.ObjectId;
  createdAt: Date;
}

const schema = new Schema<UserDoc>({
  //create mongoose schema for user database model
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
  warehouse: {
    type: Schema.Types.ObjectId,
    ref: 'Warehouse',
    require: [true, 'A user must belong to at least one warehouse'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// schema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     return next();
//   } else {
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
//   }
// });

const User = mongoose.model<UserDoc>('User', schema);

export default User;
