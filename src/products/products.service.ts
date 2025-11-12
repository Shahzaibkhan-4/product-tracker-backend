import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'Running Shoes',
      price: 99.99,
      inventoryCount: 15,
      category: { name: 'Shoes' },
      description: 'Comfortable running shoes for athletes',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 2,
      name: 'Casual T-Shirt',
      price: 29.99,
      inventoryCount: 25,
      category: { name: 'Clothing' },
      description: 'Soft cotton t-shirt for everyday wear',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
    },
    {
      id: 3,
      name: 'Sports Bag',
      price: 49.99,
      inventoryCount: 10,
      category: { name: 'Accessories' },
      description: 'Durable bag for sports equipment',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
    },
    {
      id: 4,
      name: 'Basketball Shoes',
      price: 129.99,
      inventoryCount: 8,
      category: { name: 'Shoes' },
      description: 'High-performance basketball shoes',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: 5,
      name: 'Yoga Mat',
      price: 35.99,
      inventoryCount: 3,
      category: { name: 'Sports' },
      description: 'Non-slip yoga mat for exercises',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined  {
    return this.products.find(product => product.id === id);
  }
}