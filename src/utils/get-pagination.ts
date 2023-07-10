export const getPaginationFromQuery = (query: any) => {
  const { limit = '', offset = '' } = query;
  return {
    limit: Number(limit),
    offset: Number(offset),
  };
};
