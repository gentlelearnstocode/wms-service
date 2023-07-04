export interface ISalesOrder {
  _id: string;
  products: ISalesOrderProduct[];
  status: string;
  warehouseId: string;
  SONumber: number;
}

export interface ISalesOrderProduct {
  id: string;
  orderQuantity: number;
}