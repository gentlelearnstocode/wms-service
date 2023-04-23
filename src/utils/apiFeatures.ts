export interface IAPIFeatures {
  query: object;
  queryObj: {
    page?: number
  };
}

export class APIFeatures implements IAPIFeatures {
  query: object;
  queryObj: object;
  constructor(query: object, queryObj: object) {
    this.query = query;
    this.queryObj = queryObj;
  }
  paginate(){
    const page = this.queryObj.page || 1
  }
}
