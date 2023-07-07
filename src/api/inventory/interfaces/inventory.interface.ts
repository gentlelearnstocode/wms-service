export interface IInventory {
  _id: string;
  productId: string;
  stockQuantity?: number;
  outgoingQuantity?: number;
  incomingQuantity?: number;
}
