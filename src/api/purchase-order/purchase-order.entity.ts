import { POStatus } from '../../constants/enums';
import { IOrderProduct } from '../product/interfaces/product.interface';
import { IPurchaseOrder } from './interfaces/purchase-order.interface';

export class PurchaseOrderEntity implements IPurchaseOrder {
  public _id: string;
  public PONumber: number;
  public status: string;
  public products: IOrderProduct[];
  public warehouse: string;
  public receivedAt?: string | undefined;
  public totalOrderQuantity?: number | undefined;
  public createdAt?: string | undefined;
  public supplier?: string | undefined;

  constructor(data: IPurchaseOrder) {
    this._id = data._id;
    this.PONumber = data.PONumber;
    this.products = data.products;
    this.status = data.status;
    this.warehouse = data.warehouse;
    this.totalOrderQuantity = data.totalOrderQuantity;
  }

  public upsert(): IPurchaseOrder {
    this.status = POStatus.PENDING;
    this.createdAt = new Date().toISOString();
    return {
      _id: this._id,
      PONumber: this.PONumber,
      products: this.products,
      status: this.status,
      warehouse: this.warehouse,
      createdAt: this.createdAt,
      totalOrderQuantity: this.products.reduce(
        (total, current) => (total += current.orderQuantity),
        0,
      ),
    };
  }

  public receive(): IPurchaseOrder {
    this.status = POStatus.RECEIVED;
    this.receivedAt = new Date().toISOString();
    return {
      _id: this._id,
      PONumber: this.PONumber,
      products: this.products,
      status: this.status,
      warehouse: this.warehouse,
      receivedAt: this.receivedAt,
      totalOrderQuantity: this.totalOrderQuantity,
    };
  }
}
