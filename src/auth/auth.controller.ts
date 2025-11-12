import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './interfaces/user.interface';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginData: { email: string; password: string },
  ): Promise<LoginResponse> {
    return this.authService.login(loginData.email, loginData.password);
  }

  @Post('register')
  async register(
    @Body() registerData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role: string;
    },
  ): Promise<LoginResponse> {
    return this.authService.register(registerData);
  }
}