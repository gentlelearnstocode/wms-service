import mongoose, { Document } from 'mongoose';

interface CounterDoc extends Document {
  entity: string;
  value: number;
}

const schema = new mongoose.Schema<CounterDoc>({
  entity: { type: String, required: true },
  value: {
    type: Number,
  },
});

const CounterModel = mongoose.model<CounterDoc>('Counter', schema);

export default CounterModel;
