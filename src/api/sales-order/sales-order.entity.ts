import { SOStatus } from '../../constants/enums';
import { ISalesOrder, ISalesOrderProduct } from './interfaces/sales-order.interface';

export class SalesOrderEntity implements ISalesOrder {
  public _id: string;
  public SONumber: number;
  public status: string;
  public products: ISalesOrderProduct[];
  public warehouse: string;
  public issuedAt?: string | undefined;
  public totalOrderQuantity?: number | undefined;
  public createdAt?: string | undefined;

  constructor(data: ISalesOrder) {
    this._id = data._id;
    this.SONumber = data.SONumber;
    this.products = data.products;
    this.status = data.status;
    this.warehouse = data.warehouse;
    this.totalOrderQuantity = data.totalOrderQuantity;
  }

  public upsert(): ISalesOrder {
    this.status = SOStatus.PENDING;
    this.createdAt = new Date().toISOString();
    return {
      _id: this._id,
      SONumber: this.SONumber,
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

  public issue(): ISalesOrder {
    this.status = SOStatus.ISSUED;
    this.issuedAt = new Date().toISOString();
    return {
      _id: this._id,
      SONumber: this.SONumber,
      products: this.products,
      status: this.status,
      warehouse: this.warehouse,
      issuedAt: this.issuedAt,
      totalOrderQuantity: this.totalOrderQuantity,
    };
  }
}
