export interface ISalesOrder {
  _id: string;
  products: ISalesOrderProduct[];
  status: string;
  warehouse: string;
  SONumber: number;
  createdAt?: string;
  createdBy?: string;
  issuedAt?: string;
  updatedAt?: string;
  totalOrderQuantity?: number;
}

export interface ISalesOrderProduct {
  product: string;
  orderQuantity: number;
}
