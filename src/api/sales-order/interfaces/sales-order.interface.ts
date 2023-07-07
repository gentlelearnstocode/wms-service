export interface ISalesOrder {
  _id: string;
  products: ISalesOrderProduct[];
  status: string;
  warehouseId: string;
  SONumber: number;
  createdAt?: string;
  createdBy?: string;
  issuedAt?: string;
  updatedAt?: string;
  totalOrderQuantity?: number;
}

export interface ISalesOrderProduct {
  id: string;
  orderQuantity: number;
}
