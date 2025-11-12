import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async onModuleInit() {
    await this.createSampleOrders();
  }

  private async createSampleOrders() {
    const sampleOrders = [
      {
        userId: 2, // customer user
        items: [
          { productId: 1, name: 'Running Shoes', price: 99.99, quantity: 2 },
          { productId: 2, name: 'Sports Socks', price: 12.99, quantity: 1 }
        ],
        total: 212.97,
        status: 'completed' as const,
      },
      {
        userId: 2,
        items: [
          { productId: 3, name: 'Casual T-Shirt', price: 29.99, quantity: 3 },
          { productId: 4, name: 'Sports Cap', price: 19.99, quantity: 1 }
        ],
        total: 109.96,
        status: 'delivered' as const,
      }
    ];

    for (const orderData of sampleOrders) {
      const existingOrder = await this.ordersRepository.findOne({
        where: { userId: orderData.userId, total: orderData.total }
      });
      
      if (!existingOrder) {
        const order = this.ordersRepository.create(orderData);
        await this.ordersRepository.save(order);
      }
    }
  }

  findAll() {
    return this.ordersRepository.find({ relations: ['user'] });
  }

  findByUser(userId: number) {
    return this.ordersRepository.find({ 
      where: { userId },
      order: { createdAt: 'DESC' }
    });
  }

  create(createOrderDto: any) {
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }

  async updateStatus(id: number, status: string) {
    // Type-safe status check
    const validStatuses = ['processing', 'shipped', 'delivered', 'completed', 'cancelled'] as const;
    if (!validStatuses.includes(status as any)) {
      throw new Error('Invalid status');
    }
    
    await this.ordersRepository.update(id, { status: status as any });
    return this.ordersRepository.findOne({ where: { id } });
  }
}