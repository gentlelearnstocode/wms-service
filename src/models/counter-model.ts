import mongoose, { Document } from 'mongoose';

interface CounterDoc extends Document {
  value: number;
}

const schema = new mongoose.Schema<CounterDoc>({
  _id: { type: String, required: true },
  value: {
    type: Number,
  },
});

const CounterModel = mongoose.model<CounterDoc>('Counter', schema);

export default CounterModel;
