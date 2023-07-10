export const buildLookupPipeline = (
  from: string,
  localField: string,
  foreignField: string,
  as: string,
) => {
  return {
    $lookup: {
      from,
      localField,
      foreignField,
      as,
    },
  };
};
