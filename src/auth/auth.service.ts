import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    // Create sample users if they don't exist
    await this.createSampleUsers();
  }

  private async createSampleUsers() {
    const sampleUsers = [
      {
        email: 'admin@example.com',
        password: await bcrypt.hash('Admin123', 10),
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
      },
      {
        email: 'customer@example.com', 
        password: await bcrypt.hash('Customer123', 10),
        firstName: 'John',
        lastName: 'Doe',
        role: 'customer'
      }
    ];

    for (const userData of sampleUsers) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: userData.email }
      });
      
      if (!existingUser) {
        const user = this.usersRepository.create(userData);
        await this.usersRepository.save(user);
      }
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Create JWT token with 7-day expiry
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token: token,
    };
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }) {
    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: userData.email }
    });

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create new user
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);

    // Create JWT token with 7-day expiry
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token: token,
    };
  }
async getAllUsers() {
  const users = await this.usersRepository.find({
    select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
    order: { createdAt: 'DESC' }
  });
  
  return users;
}

}