import { CounterModel } from '../models';

export const getIncrementValue = async (entity: string): Promise<number> => {
  const count = await CounterModel.findOneAndUpdate(
    {
      _id: entity,
    },
    {
      $inc: {
        value: 1,
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return count.value ?? NaN;
};
