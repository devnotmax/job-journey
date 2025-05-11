// user.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Método de registro
  async register(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing)
      throw new BadRequestException(
        'This email is already registered in our system',
      );

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, name, password: hashed },
    });

    return {
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  // Método de login
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new BadRequestException('Invalid password');

    // Generar el token JWT
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'User logged in successfully',
      user: { id: user.id, email: user.email, name: user.name },
      accessToken, // Devolvemos el token JWT
    };
  }
}
