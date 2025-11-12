import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; 
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get('users')
  @Roles('admin')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}