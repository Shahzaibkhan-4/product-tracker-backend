export interface Product {
  id: number;
  name: string;
  price: number;
  inventoryCount: number;
  category?: {
    name: string;
  };
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}