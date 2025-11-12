import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column('jsonb')
  items: Array<{
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }>;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'processing' })
  status: 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}