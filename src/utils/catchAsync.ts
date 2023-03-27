//write a function to catch async errors

export const catchAsync = (fn: any) => (req: any, res: any, next: any) => {
  fn(req, res, next).catch(next);
};
