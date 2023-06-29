import mongoose, { Document, SchemaTypes } from 'mongoose';

interface CounterDoc extends Document {
  entity: string;
  value: number;
}

const schema = new mongoose.Schema<CounterDoc>({
  entity: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const CounterModel = mongoose.model<CounterDoc>('Counter', schema);

export default CounterModel;
