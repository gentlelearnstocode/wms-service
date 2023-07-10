import { IOrderProduct } from '../../product/interfaces/product.interface';

export interface IPurchaseOrder {
  _id: string;
  products: IOrderProduct[];
  status: string;
  warehouse: string;
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
