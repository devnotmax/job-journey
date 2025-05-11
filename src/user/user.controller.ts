import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return {
      message: 'User data retrieved successfully',
      user: req.user,
    };
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.userService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }
}
