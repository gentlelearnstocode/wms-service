export interface IInventory {
  productId: string;
  stockQuantity?: number;
  outgoingQuantity?: number;
  incomingQuantity?: number;
}