export interface IPurchaseOrder {
  _id: string;
  products: IPurchaseOrderProduct[];
  status: string;
  warehouseId: string;
  PONumber: number;
  supplier?: string;
  createdAt?: string;
  updatedAt?: string;
  receivedAt?: string;
  totalOrderQuantity?: number;
}

export interface IPurchaseOrderProduct {
  id: string;
  orderQuantity: number;
}
