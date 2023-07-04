export interface IUser<T> {
  email: string;
  password: string;
  role: string;
  warehouses: T;
}
