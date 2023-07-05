export interface IPurchaseOrder {
  _id: string;
  products: IPurchaseOrderProduct[];
  status: string;
  warehouseId: string;
  PONumber: number;
  supplier: string;
}

export interface IPurchaseOrderProduct {
  id: string;
  orderQuantity: number;
}